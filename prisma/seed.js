import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  })
  console.log('✅ Admin user created')

  // Create home content
  await prisma.homeContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heroTitle1: 'Transform Your Ad Spend',
      heroTitle2: 'Into Real',
      typedWords: 'Customers,Revenue,Profit',
      subHeadline: 'And Bring The Growth You Deserve',
      description: "We'll pinpoint where you are in your advertising journey and deliver customized solutions that maximize your ROI",
      ctaText: 'Work With Us',
      ctaLink: 'https://calendly.com/rohittangri/just-starting-out',
      bigStat: '$600K',
      statsText1: 'Get Exposure has profitably spent over',
      statsText2: '$600K in Ad spend',
      statsText3: 'and generated over $2.4M.',
      journeyTitle1: 'Where Are You in Your',
      journeyTitle2: 'Advertising Journey',
      journeyDesc: 'We start by pinpointing exactly where you are in your advertising journey. Every business is unique, and your challenges require tailored solutions.',
    },
  })
  console.log('✅ Home content created')

  // Create positions
  const positions = [
    {
      slug: 'rocket',
      title: 'Looking to Scale?',
      subtitle: 'Ready to scale above $25k-$30k daily',
      description: "If you're ready to scale your campaign above 25k - 30k a day, we can do it by following our proven 6 step scaling strategy.",
      calendlyLink: 'https://calendly.com/rohittangri/just-starting-out-clone',
      displayOrder: 1,
    },
    {
      slug: 'station',
      title: 'Looking to Optimize?',
      subtitle: 'Already spending but need better performance',
      description: "If you're spending consistently on ads but the performance has dropped, we can help you with our customized 6 step process.",
      calendlyLink: 'https://calendly.com/rohittangri/looking-to-scale-clone',
      displayOrder: 2,
    },
    {
      slug: 'parts',
      title: 'Just Starting?',
      subtitle: 'New to advertising and need guidance',
      description: "Ready to launch your first Facebook ad campaign but unsure where to begin? We'll guide you through the entire process step by step.",
      calendlyLink: 'https://calendly.com/rohittangri/just-starting-out',
      displayOrder: 3,
    },
  ]

  for (const position of positions) {
    await prisma.position.upsert({
      where: { slug: position.slug },
      update: position,
      create: position,
    })
  }
  console.log('✅ Positions created')

  // Create case studies
  const caseStudies = [
    {
      category: 'Healthcare Education',
      title: 'Medical Education',
      slug: 'case1',
      description: 'Our client specializes in EKG interpretation training for nurse practitioners where accuracy can mean life or death. When ad fatigue hit and CPL skyrocketed, we pivoted to target problem-aware audiences with entirely new messaging frameworks.',
      result1: 'Reduced CPL by 65%',
      result2: 'Increased conversion rate by 180%',
      result3: 'Scaled to $50k/month',
      displayOrder: 1,
    },
    {
      category: 'Healthcare Business',
      title: 'MedSpa Business',
      slug: 'case2',
      description: 'Our client helps healthcare professionals transition to owning medspas. When they shifted from live to evergreen webinars, we systematically mapped pain points across awareness levels to maintain conversion rates without the urgency of live events.',
      result1: 'Maintained 4.2% conversion rate',
      result2: 'Reduced cost per lead by 40%',
      result3: 'Automated lead generation',
      displayOrder: 2,
    },
    {
      category: 'Healthcare Services',
      title: 'IV Hydration',
      slug: 'case3',
      description: 'Our client teaches healthcare professionals about IV therapies. We repositioned the entire offering from clinical procedure training to business opportunity development, creating differentiation in a crowded healthcare education market.',
      result1: 'Increased ROAS by 220%',
      result2: 'Expanded to 3 new markets',
      result3: 'Built $2M+ pipeline',
      displayOrder: 3,
    },
    {
      category: 'Health & Wellness',
      title: 'Supplements',
      slug: 'case4',
      description: 'Our client needed a systematic approach to launch multiple supplement products simultaneously. We developed a comprehensive ad testing framework across all awareness levels, prioritizing bioavailability as the primary USP.',
      result1: 'Launched 5 products successfully',
      result2: 'Achieved 3.8x ROAS average',
      result3: 'Built loyal customer base',
      displayOrder: 4,
    },
    {
      category: 'Business Networking',
      title: 'Internet Mastermind',
      slug: 'case5',
      description: 'Our client runs an exclusive CEO network in Vancouver but struggled to attract qualified leads. We implemented broad targeting with qualifying copy that outperformed conventional interest targeting, attracting higher-caliber executives.',
      result1: 'Increased lead quality by 300%',
      result2: 'Reduced cost per qualified lead by 55%',
      result3: 'Filled mastermind program',
      displayOrder: 5,
    },
    {
      category: 'Skincare',
      title: 'Skinlycious',
      slug: 'case6',
      description: 'Our client needed to differentiate in a crowded skincare market. We developed a comprehensive content strategy that positioned them as experts in acne treatment, resulting in significant improvements in conversion and customer acquisition.',
      result1: '40% increase in conversion rate',
      result2: '25% lower customer acquisition costs',
      result3: 'Built brand authority',
      displayOrder: 6,
    },
  ]

  for (const caseStudy of caseStudies) {
    await prisma.caseStudy.upsert({
      where: { slug: caseStudy.slug },
      update: caseStudy,
      create: caseStudy,
    })
  }
  console.log('✅ Case studies created')

  // Create solution types
  const solutionTypes = [
    {
      slug: 'looking-to-scale',
      title: 'Looking To Scale',
      description: 'Hey, nice to meet you. Since you\'re already spending on ads but not seeing optimal results, here\'s what your journey might look like once we start working together.',
      videoUrl: 'https://drive.google.com/file/d/1VNI3AONMVuR8Q-7zbVUOJcoMk8jwOj6F/preview',
      calendlyLink: 'https://calendly.com/rohittangri/just-starting-out-clone',
    },
    {
      slug: 'looking-to-optimize',
      title: 'Looking To Optimize',
      description: 'Hey, nice to meet you. Since you\'re already spending on ads but not seeing optimal results, here\'s what your journey might look like once we start working together.',
      videoUrl: 'https://drive.google.com/file/d/1RxJmPPzr6I2qCUS9y687jQPqg0As7cp0/preview',
      calendlyLink: 'https://calendly.com/rohittangri/looking-to-scale-clone',
    },
    {
      slug: 'just-starting',
      title: 'Just Starting',
      description: 'Hey, nice to meet you. Since you\'re already spending on ads but not seeing optimal results, here\'s what your journey might look like once we start working together.',
      videoUrl: 'https://drive.google.com/file/d/1VNI3AONMVuR8Q-7zbVUOJcoMk8jwOj6F/preview',
      calendlyLink: 'https://calendly.com/rohittangri/just-starting-out',
    },
  ]

  for (const solutionType of solutionTypes) {
    await prisma.solutionType.upsert({
      where: { slug: solutionType.slug },
      update: solutionType,
      create: solutionType,
    })
  }
  console.log('✅ Solution types created')

  // Create solution steps for "looking-to-scale"
  const scaleSteps = [
    {
      title: 'Performance Audit & Scaling Roadmap',
      description: "We'll dive deep into your account, analyzing every metric that matters to identify exactly what's working and what's holding you back in terms of audience targeting, creative performance, and conversion efficiency. You' receive a detailed scaling blueprint with clear milestones and timelines. We' identify all growth opportunities and share a comprehensive strategy that addresses your specific business objectives. And since markets often shift and consumer behaviors evolve, our strategy remains flexible by design- incorporating pivot points and contingency plans to keep your campaigns performing regardless of market conditions.",
      stepOrder: 1,
    },
    {
      title: 'Campaign Architecture Optimization',
      description: "We won't disrupt your current campaigns that are performing well. Instead, well preserve what's working while strategically enhancing your campaign structure to support high-volume spend without performance drops. Depending on your available ad budget, we can tackle all growth opportunities simultaneously or prioritize them one by one. Our approach Includes some proven scaling techniques like refining your highest-potential audiences, implementing advanced bidding strategies, and creating a flexible budget allocation system that adapts as your campaigns scale-all specifically designed for high-growth accounts.",
      stepOrder: 2,
    },
    {
      title: 'Creative Amplification System',
      description: "W'll use our Creative Testing Matrix to ideate impactful concepts and then create ads that resonate perfectly with your audience. While scaling, your pipeline will always be full of diverse high-converting creatives. These fresh ads will not only prevent ad fatigue from killing your existing momentum, but also help us expand into new audiences and opportunities.",
      stepOrder: 3,
    },
    {
      title: 'Controlled Scaling Execution',
      description: "If you're new to scaling, we won't just double your ad budget overight and risk tanking your results. Instead, we use our Phase-based Scaling Approach to gradually increase your spend while keeping your performance stable. We constantly monitor your campaigns and fix issues before they become problems, helping you confidently reach higher spending levels without the usual headaches.",
      stepOrder: 4,
    },
    {
      title: 'Cross-Channel Integration',
      description: "We'll start working on expanding winning strategies, creatives, messaging across multiple platforms, creating a cohesive ecosystem that maximizes your total addressable market while maintaining efficiency. This doesn't mean we'll simply copy paste. Instead, it means we'll identify what digital assets you need before we switch platforms and then start working on those.",
      stepOrder: 5,
    },
    {
      title: 'Continuous Optimization & Growth',
      description: 'Our team will implement advanced optimization protocols, conduct weekly performance reviews, and continuously refine workflows to ensure sustained growth and prevent performance plateaus.',
      stepOrder: 6,
    },
  ]

  const scaleType = await prisma.solutionType.findUnique({ where: { slug: 'looking-to-scale' } })
  for (const step of scaleSteps) {
    await prisma.solutionStep.create({
      data: {
        ...step,
        solutionTypeId: scaleType.id,
      },
    })
  }

  // Create solution steps for "looking-to-optimize"
  const optimizeSteps = [
    {
      title: 'Performance Analysis & Efficiency Roadmap',
      description: 'We will conduct a thorough analysis of your current campaigns to identify what\'s working and where the leaks are happening. You will receive a detailed optimization blueprint showing exactly which metrics need improvement and how we will fix them. This includes audience targeting refinements, creative performance evaluation, and conversion path analysis. Our strategy stays flexible to adapt to market changes, with clear contingency plans to maintain performance even when conditions shift.',
      stepOrder: 1,
    },
    {
      title: 'Campaign Structure Refinement',
      description: 'We\'ll preserve your performing campaigns while strategically rebuilding your underperforming ones. Our approach will focus on eliminating wasted spend and creating a more efficient campaign architecture. Based on your priorities, we\'ll implement proven optimization techniques like audience consolidation, advanced bidding strategies, and budget redistribution-all specifically designed to improve efficiency without disrupting what\'s already working.',
      stepOrder: 2,
    },
    {
      title: 'Creative Refresh Implementation',
      description: 'Using our Creative Testing Matrix™, we\'ll identify which messages and visuals actually connect with your audience. We\'ll develop a pipeline of fresh, high-converting creatives that prevent ad fatigue and generate consistent results. These improved ads will not only boost your existing campaigns but also help us discover new audience segments that respond to different messaging aboroaches.',
      stepOrder: 3,
    },
    {
      title: 'Optimization Protocol Execution',
      description: 'Instead of making random changes, we\'ll implement our Systematic Optimization Framework™ to methodically improve performance. Our real-time monitoring system identifies issues before they impact your results, allowing us to make data-driven adjustments that steadily improve your ROAS and conversion rates without disrupting account stability.',
      stepOrder: 4,
    },
    {
      title: 'Sustained Performance & Growth',
      description: 'We\'ll start working on expanding winning strategies, creatives, messaging across multiple platforms, creating a cohesive ecosystem that maximizes your total addressable market while maintaining efficiency. This doesn\'t mean we\'ll simply copy paste. Instead, it means we\'ll identify what digital assets you need before we switch platforms and then start working on those.',
      stepOrder: 5,
    },
  ]

  const optimizeType = await prisma.solutionType.findUnique({ where: { slug: 'looking-to-optimize' } })
  for (const step of optimizeSteps) {
    await prisma.solutionStep.create({
      data: {
        ...step,
        solutionTypeId: optimizeType.id,
      },
    })
  }

  // Create solution steps for "just-starting"
  const startingSteps = [
    {
      title: 'Foundation & Strategy Development',
      description: "We'll start by understanding your business goals, target audience, and unique selling proposition. You'll receive a comprehensive advertising plan tailored specifically to your business needs and budget. This includes customer persona development, competitive analysis, and clear KPI benchmarks. We'll create easy to understand tracking sheets that will show clear metrics and give us a picture of where your campaigns are headed from day one.",
      stepOrder: 1,
    },
    {
      title: 'Account & Campaign Setup',
      description: "We'll handle the technical heavy lifting by properly setting up your advertising accounts with the right structure for a sustainable future growth. This includes implementing conversion tracking, creating custom audiences, and establishing your initial campaign architecture. We'l ensure everything is properly connected and tested before launching",
      stepOrder: 2,
    },
    {
      title: 'Initial Creative Development',
      description: 'Using our Creative Testing Matrix", we\'ll develop your first set of ads designed to connect with your audience and generate results, instead of guessing what might work, we\'ll create a strategic variety of messages and visuals that will help us quickly identify what resonates with your customers. This approach sets you up with reliable creative insights from the very beginning.',
      stepOrder: 3,
    },
    {
      title: 'Controlled Launch & Testing',
      description: "We'll implement a methodical launch strategy that starts with small, targeted tests to validate our approach before scaling your spend while avoiding wasting budget and establishing baseline performance metrics. We'll monitor campaigns closely during this critical phase, making real-time adjustments to optimize initial performance.",
      stepOrder: 4,
    },
    {
      title: 'Audience Expansion',
      description: "Once we've identified your most responsive audiences, we'll methodically expand your reach to similar high-potential segments. We'll help you build valuable custom audiences based on website visitors and engagement, creating a sustainable foundation for remarketing and lookalike audiences that will become increasingly valuable over time.",
      stepOrder: 5,
    },
    {
      title: 'Performance Scaling & Optimization',
      description: "As your campaigns gain traction, we'll implement our Phase-based Scaling Approach to gradually increase your budget while maintaining or improving performance metrics. We'll conduct regular performance reviews and continuously refine your strategy based on real data, ensuring your advertising foundation supports long-term, sustainable growth",
      stepOrder: 6,
    },
  ]

  const startingType = await prisma.solutionType.findUnique({ where: { slug: 'just-starting' } })
  for (const step of startingSteps) {
    await prisma.solutionStep.create({
      data: {
        ...step,
        solutionTypeId: startingType.id,
      },
    })
  }
  console.log('✅ Solution steps created')

  // Create contact info
  const contactInfos = [
    {
      type: 'info',
      icon: 'MapPin',
      title: 'Location',
      details: 'Vancouver, BC, Canada',
      order: 1,
    },
    {
      type: 'info',
      icon: 'Phone',
      title: 'Phone',
      details: '+1 778 712 3301',
      order: 2,
    },
    {
      type: 'info',
      icon: 'Mail',
      title: 'Email',
      details: 'admin@getexposure.ca',
      order: 3,
    },
    {
      type: 'info',
      icon: 'Clock',
      title: 'Business Hours',
      details: 'Mon-Fri: 9AM-6PM PST',
      order: 4,
    },
    {
      type: 'benefit',
      title: 'Free 30-minute strategy consultation',
      details: 'Free 30-minute strategy consultation',
      order: 1,
    },
    {
      type: 'benefit',
      title: 'Custom advertising roadmap',
      details: 'Custom advertising roadmap',
      order: 2,
    },
    {
      type: 'benefit',
      title: 'No-obligation assessment',
      details: 'No-obligation assessment',
      order: 3,
    },
    {
      type: 'benefit',
      title: 'Same-day response guarantee',
      details: 'Same-day response guarantee',
      order: 4,
    },
    {
      type: 'stat',
      title: '50+',
      details: 'Clients',
      order: 1,
    },
    {
      type: 'stat',
      title: '$2M+',
      details: 'Revenue',
      order: 2,
    },
    {
      type: 'stat',
      title: '24/7',
      details: 'Support',
      order: 3,
    },
  ]

  for (const info of contactInfos) {
    await prisma.contactInfo.create({ data: info })
  }
  console.log('✅ Contact info created')

  // Create contact content
  await prisma.contactContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      mainTitle1: 'Ready to Scale',
      mainTitle2: 'Your Advertising?',
      mainDescription: 'Book a free consultation to discover how we can transform your ad campaigns into a profitable growth engine.',
      benefitsTitle: "What You'll Get",
      contactTitle: 'Get in Touch',
      trustBadge: "Join 50+ businesses who've scaled their advertising with our proven strategies",
    },
  })
  console.log('✅ Contact content created')

  // Create stat items
  const statItems = [
    {
      value: '500',
      suffix: 'K+',
      label: 'Managed',
      icon: 'DollarSign',
      order: 1,
    },
    {
      value: '2',
      suffix: 'M+',
      label: 'Generated',
      icon: 'TrendingUp',
      order: 2,
    },
    {
      value: '12',
      suffix: '+',
      label: 'Businesses Helped',
      icon: 'Users',
      order: 3,
    },
  ]

  for (const stat of statItems) {
    await prisma.statItem.create({ data: stat })
  }
  console.log('✅ Stat items created')

  // Create stats content
  await prisma.statsContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Our Proven Results',
      description: "See how we've transformed campaigns from struggling to scaling by implementing our proprietary systems and data-driven strategies.",
    },
  })
  console.log('✅ Stats content created')

  // Create logo images
  const logos = [
    { filename: '1.png', path: '/brands/1.png', order: 1 },
    { filename: '2.png', path: '/brands/2.png', order: 2 },
    { filename: '3.png', path: '/brands/3.png', order: 3 },
    { filename: '4.png', path: '/brands/4.png', order: 4 },
    { filename: '5.png', path: '/brands/5.png', order: 5 },
    { filename: '6.png', path: '/brands/6.png', order: 6 },
    { filename: '7.png', path: '/brands/7.png', order: 7 },
    { filename: '8.png', path: '/brands/8.png', order: 8 },
  ]

  for (const logo of logos) {
    await prisma.logoImage.upsert({
      where: { path: logo.path },
      update: logo,
      create: logo,
    })
  }
  console.log('✅ Logo images created')

  // Create settings
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      siteName: 'Get Exposure',
      siteDescription: 'Transform Your Ad Spend Into Real Results',
      defaultCalendlyLink: 'https://calendly.com/rohittangri/just-starting-out',
      email: 'admin@getexposure.ca',
      phone: '+1 778 712 3301',
      location: 'Vancouver, BC, Canada',
      businessHours: 'Mon-Fri: 9AM-6PM PST',
    },
  })
  console.log('✅ Settings created')

  console.log('🎉 Database seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })

