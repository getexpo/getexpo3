import prisma from '@/lib/prisma-direct'

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://getexpo3-tawny.vercel.app'

  // Fetch dynamic routes from database
  let caseStudies = []
  let solutions = []

  try {
    // Fetch case studies directly from database
    caseStudies = await prisma.caseStudy.findMany({
      where: { isPublished: true },
      select: {
        slug: true,
        updatedAt: true,
      },
    })
  } catch (error) {
    console.error('Error fetching case studies for sitemap:', error)
    caseStudies = []
  }

  try {
    // Fetch solutions directly from database
    solutions = await prisma.solutionType.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    })
  } catch (error) {
    console.error('Error fetching solutions for sitemap:', error)
    solutions = []
  } finally {
    // Disconnect Prisma client to avoid connection issues
    await prisma.$disconnect().catch(() => {})
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
  const caseStudyRoutes = Array.isArray(caseStudies) ? caseStudies.map((study) => ({
    url: `${baseUrl}/CaseStudy/${study.slug}`,
    lastModified: new Date(study.updatedAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.7,
  })) : []

  // Dynamic solution routes
  const solutionRoutes = Array.isArray(solutions) ? solutions.map((solution) => ({
    url: `${baseUrl}/Solution/${solution.slug}`,
    lastModified: new Date(solution.updatedAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.8,
  })) : []

  return [...staticRoutes, ...caseStudyRoutes, ...solutionRoutes]
}

