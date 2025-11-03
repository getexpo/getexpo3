import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

export const homeContentSchema = z.object({
  heroTitle1: z.string().min(1),
  heroTitle2: z.string().min(1),
  typedWords: z.string().min(1),
  subHeadline: z.string().min(1),
  description: z.string().min(1),
  ctaText: z.string().min(1),
  ctaLink: z.string().url(),
  bigStat: z.string().min(1),
  statsText1: z.string().min(1),
  statsText2: z.string().min(1),
  statsText3: z.string().min(1),
  journeyTitle1: z.string().min(1),
  journeyTitle2: z.string().min(1),
  journeyDesc: z.string().min(1),
})

export const positionSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  calendlyLink: z.string().url(),
  displayOrder: z.number().optional(),
  isActive: z.boolean().optional(),
})

export const caseStudySchema = z.object({
  category: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  result1: z.string().min(1),
  result2: z.string().min(1),
  result3: z.string().min(1),
  displayOrder: z.number().optional(),
  isPublished: z.boolean().optional(),
})

export const solutionTypeSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  videoUrl: z.string().url(),
  calendlyLink: z.string().url(),
})

export const solutionStepSchema = z.object({
  solutionTypeId: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
  stepOrder: z.number().optional(),
})

export const contactInfoSchema = z.object({
  type: z.enum(['info', 'benefit', 'stat']),
  icon: z.string().optional(),
  title: z.string().min(1),
  details: z.string().min(1),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
})

export const statItemSchema = z.object({
  value: z.string().min(1),
  suffix: z.string().min(1),
  label: z.string().min(1),
  icon: z.string().min(1),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
})

export const logoImageSchema = z.object({
  filename: z.string().min(1),
  path: z.string().min(1),
  alt: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
})

export const settingsSchema = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string().min(1),
  defaultCalendlyLink: z.string().url(),
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(1),
  businessHours: z.string().min(1),
  googleAnalyticsId: z.string().optional(),
  facebookPixelId: z.string().optional(),
})

