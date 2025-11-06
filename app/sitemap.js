export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://getexpo3-tawny.vercel.app'

  // Fetch dynamic routes from database
  let positions = []
  let caseStudies = []
  let solutions = []

  try {
    const positionsRes = await fetch(`${baseUrl}/api/positions`, { next: { revalidate: 3600 } })
    positions = await positionsRes.json()

    const caseStudiesRes = await fetch(`${baseUrl}/api/case-studies?published=true`, { next: { revalidate: 3600 } })
    caseStudies = await caseStudiesRes.json()

    const solutionsRes = await fetch(`${baseUrl}/api/solutions`, { next: { revalidate: 3600 } })
    solutions = await solutionsRes.json()
  } catch (error) {
    console.error('Error fetching dynamic routes for sitemap:', error)
  }

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Dynamic case study routes
  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/CaseStudy/${study.slug}`,
    lastModified: new Date(study.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Dynamic solution routes
  const solutionRoutes = solutions.map((solution) => ({
    url: `${baseUrl}/Solution/${solution.slug}`,
    lastModified: new Date(solution.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...caseStudyRoutes, ...solutionRoutes]
}

