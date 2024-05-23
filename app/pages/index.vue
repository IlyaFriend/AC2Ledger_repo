<template>
  <div class="bg-white">
    <main>
      <!-- Hero section -->
      <div class="relative isolate pt-14">
        <svg class="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width="200"
              height="200"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
            <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
          </svg>
          <rect width="100%" height="100%" stroke-width="0" fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
        </svg>
        <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div class="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 class="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              A better way to manage yor achievements
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              Streamline and showcase academic achievements with our comprehensive university faculty accomplishments registry. Secure, scalable, and user-friendly.
            </p>
            <div class="mt-10 flex items-center gap-x-6">
              <NuxtLink href="/signup" class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
                Get started
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature section -->
      <div class="mx-auto mb-32 max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base font-semibold leading-7 text-primary-600">
            Enhance Your Academic Portfolio
          </h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Effortlessly manage and display university, faculty, and department achievements with our intuitive platform.
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div v-for="feature in secondaryFeatures" :key="feature.name" class="flex flex-col">
              <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Icon :name="feature.icon" class="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                {{ feature.name }}
              </dt>
              <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p class="flex-auto">
                  {{ feature.description }}
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const secondaryFeatures = [
  {
    name: 'Comprehensive Achievement Tracking',
    description:
      'Easily record, update, and manage all academic and professional achievements. Our platform supports a wide range of accomplishment types.',
    icon: 'heroicons-solid:arrow-trending-up'
  },
  {
    name: 'Seamless Scopus Integration',
    description:
      'Automatically import publications from Scopus with ease. Keep your academic portfolio up-to-date with minimal effort.',
    icon: 'heroicons-solid:arrow-down-tray'
  },
  {
    name: 'Robust University Hierarchy',
    description:
      'Manage faculty and departments efficiently. Our platform supports a detailed hierarchical structure, ensuring accurate and organized data management.',
    icon: 'heroicons-solid:academic-cap'
  }
]
</script>
