import { defineEventHandler } from 'h3'
import { Achievement } from '~/server/dbModels'

function getFullName (author: any): string {
  const givenName = author['ce:given-name'] || author['preferred-name']?.['ce:given-name'] || ''
  const surname = author['ce:surname'] || author['preferred-name']?.['ce:surname'] || ''
  const indexedName = author['ce:indexed-name'] || ''

  let result = 'Unknown'
  if (givenName && surname) {
    result = `${givenName} ${surname}`
  } else if (surname) {
    result = surname
  } else if (indexedName) {
    result = indexedName
  }
  return result.trim()
}

type AbstractDocument = {
  title: string
  type: string
  details: {
    'Creator\'s Full Name': string
    'Creator\'s Scopus Id': string
    'Publication Name': string
    ISSN: string
    'Page Range': string
    'Cover Date': string
    Citations: string | number
  },
  scopus_id: string | number,
  year: number
}

const castToAbstractDocument = (document: any): AbstractDocument => {
  const creator = document['dc:creator']?.author?.[0]
  return {
    title: document['dc:title'],
    type: document.subtypeDescription,
    details: {
      'Creator\'s Full Name': getFullName(creator),
      'Creator\'s Scopus Id': creator?.['@auid'],
      'Publication Name': document['prism:publicationName'],
      ISSN: document['prism:issn'],
      'Page Range': document['prism:pageRange'],
      'Cover Date': document['prism:coverDate'],
      Citations: document['citedby-count']
    },
    scopus_id: document['dc:identifier'].split(':')[1],
    year: +document['prism:coverDate'].split('-')[0] || new Date().getFullYear()
  }
}

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  const { scopusApiKey }: { scopusApiKey?: string } = useRuntimeConfig(event).public
  if (!scopusApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Scopus API key not found.'
    })
  }

  const authorUrl = `https://api.elsevier.com/content/search/scopus?query=au-id(${id})&apiKey=${scopusApiKey}`

  const headers = {
    'X-ELS-APIKey': scopusApiKey
  }
  const queryParams = new URLSearchParams({
    apiKey: scopusApiKey,
    httpAccept: 'application/json'
  })

  try {
    const sourcesByAuthorFetchResponse: any = await $fetch(authorUrl, {
      headers
    })

    if (!sourcesByAuthorFetchResponse || !sourcesByAuthorFetchResponse?.['search-results']) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No results found.'
      })
    }
    if (!sourcesByAuthorFetchResponse?.['search-results']?.entry?.length) {
      return []
    }
    const entriesLinks = sourcesByAuthorFetchResponse?.['search-results']?.entry.map((item: any) => item?.['prism:url'])
    const documentsFetchResponse = await Promise.all(entriesLinks.map(async (link: any) => await $fetch(`${link}?httpAccept=application/json&apiKey=${scopusApiKey}`, {
      query: queryParams
    })))

    const documents = documentsFetchResponse.map(item => item?.['abstracts-retrieval-response']?.coredata)

    const abstractDocuments: AbstractDocument[] = documents.map(doc =>
      castToAbstractDocument(doc)
    )

    const existingAchievements = await Achievement.find({
      $and: [
        { scopus_id: { $in: abstractDocuments.map(doc => doc.scopus_id) } },
        {
          $or: [
            { createdBy: event.context.user?.id },
            { users: { $in: [event.context.user?.id] } }
          ]
        }
      ]
    })

    return { results: abstractDocuments, existing: existingAchievements }
  } catch (err) {
    console.log(err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error when fetching elsevier.'
    })
  }
})
