export const achievementTypes = {
  Article: {
    category: 'Publications',
    score: 8
  },
  'Conference Paper': {
    category: 'Publications',
    score: 8
  },
  'Books or Book Chapters': {
    category: 'Publications',
    score: 9
  },
  'Technical Reports': {
    category: 'Publications',
    score: 5
  },

  'Conference Presentation': {
    category: 'Presentations',
    score: 4
  },
  'Invited Talk or Seminar': {
    category: 'Presentations',
    score: 3
  },

  'Supervision of Graduate or Undergraduate Students': {
    category: 'Supervision',
    score: 3
  },
  'Postdoctoral Supervision': {
    category: 'Supervision',
    score: 4
  },

  'Research Grant': {
    category: 'Grants and Funding',
    score: 9
  },
  Fellowship: {
    category: 'Grants and Funding',
    score: 7
  },
  Award: {
    category: 'Grants and Funding',
    score: 8
  },

  'Workshops Attended or Conducted': {
    category: 'Professional Development',
    score: 6
  },
  Certification: {
    category: 'Professional Development',
    score: 5
  },

  'Patents Filed or Granted': {
    category: 'Patents and Intellectual Property',
    score: 10
  },
  'Intellectual Property Contributions': {
    category: 'Patents and Intellectual Property',
    score: 10
  },

  'Editorial Board Memberships': {
    category: 'Editorial and Review Activities',
    score: 7
  },
  'Reviewing for Journals or Conferences': {
    category: 'Editorial and Review Activities',
    score: 6
  },

  'Outreach Activities': {
    category: 'Community Engagement',
    score: 2
  },
  'Public Lectures or Media Appearances': {
    category: 'Community Engagement',
    score: 3
  },

  'Academic Award': {
    category: 'Awards and Honors',
    score: 8
  },
  'Honorary Membership': {
    category: 'Awards and Honors',
    score: 4
  },

  'Developing of Software Tools': {
    category: 'Software and Tools',
    score: 9
  },
  'Contributed to Open-source Projects': {
    category: 'Software and Tools',
    score: 7
  },
  Other: {
    category: 'Other',
    score: 1
  }
}

export const achievementTypeNames = Object.keys(achievementTypes)
