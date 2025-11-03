-- CreateTable
CREATE TABLE "Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HomeContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "heroTitle1" TEXT NOT NULL DEFAULT 'Transform Your Ad Spend',
    "heroTitle2" TEXT NOT NULL DEFAULT 'Into Real',
    "typedWords" TEXT NOT NULL DEFAULT 'Customers,Revenue,Profit',
    "subHeadline" TEXT NOT NULL DEFAULT 'And Bring The Growth You Deserve',
    "description" TEXT NOT NULL DEFAULT 'We''ll pinpoint where you are in your advertising journey and deliver customized solutions that maximize your ROI',
    "ctaText" TEXT NOT NULL DEFAULT 'Work With Us',
    "ctaLink" TEXT NOT NULL DEFAULT 'https://calendly.com/rohittangri/just-starting-out',
    "bigStat" TEXT NOT NULL DEFAULT '$600K',
    "statsText1" TEXT NOT NULL DEFAULT 'Get Exposure has profitably spent over',
    "statsText2" TEXT NOT NULL DEFAULT '$600K in Ad spend',
    "statsText3" TEXT NOT NULL DEFAULT 'and generated over $2.4M.',
    "journeyTitle1" TEXT NOT NULL DEFAULT 'Where Are You in Your',
    "journeyTitle2" TEXT NOT NULL DEFAULT 'Advertising Journey',
    "journeyDesc" TEXT NOT NULL DEFAULT 'We start by pinpointing exactly where you are in your advertising journey. Every business is unique, and your challenges require tailored solutions.',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "calendlyLink" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "result1" TEXT NOT NULL,
    "result2" TEXT NOT NULL,
    "result3" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SolutionType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "calendlyLink" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SolutionStep" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "solutionTypeId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stepOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SolutionStep_solutionTypeId_fkey" FOREIGN KEY ("solutionTypeId") REFERENCES "SolutionType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "icon" TEXT,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContactContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mainTitle1" TEXT NOT NULL DEFAULT 'Ready to Scale',
    "mainTitle2" TEXT NOT NULL DEFAULT 'Your Advertising?',
    "mainDescription" TEXT NOT NULL DEFAULT 'Book a free consultation to discover how we can transform your ad campaigns into a profitable growth engine.',
    "benefitsTitle" TEXT NOT NULL DEFAULT 'What You''ll Get',
    "contactTitle" TEXT NOT NULL DEFAULT 'Get in Touch',
    "trustBadge" TEXT NOT NULL DEFAULT 'Join 50+ businesses who''ve scaled their advertising with our proven strategies',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "StatItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "suffix" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'DollarSign',
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "StatsContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL DEFAULT 'Our Proven Results',
    "description" TEXT NOT NULL DEFAULT 'See how we''ve transformed campaigns from struggling to scaling by implementing our proprietary systems and data-driven strategies.',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LogoImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "alt" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GeneralImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "alt" TEXT,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siteName" TEXT NOT NULL DEFAULT 'Get Exposure',
    "siteDescription" TEXT NOT NULL DEFAULT 'Transform Your Ad Spend Into Real Results',
    "defaultCalendlyLink" TEXT NOT NULL DEFAULT 'https://calendly.com/rohittangri/just-starting-out',
    "email" TEXT NOT NULL DEFAULT 'team@getexposure.ca',
    "phone" TEXT NOT NULL DEFAULT '+1 778 712 3301',
    "location" TEXT NOT NULL DEFAULT 'Vancouver, BC, Canada',
    "businessHours" TEXT NOT NULL DEFAULT 'Mon-Fri: 9AM-6PM PST',
    "googleAnalyticsId" TEXT,
    "facebookPixelId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CaseStudyContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "caseSlug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "client" TEXT,
    "challenge" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Position_slug_key" ON "Position"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_slug_key" ON "CaseStudy"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SolutionType_slug_key" ON "SolutionType"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LogoImage_path_key" ON "LogoImage"("path");

-- CreateIndex
CREATE UNIQUE INDEX "GeneralImage_path_key" ON "GeneralImage"("path");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudyContent_caseSlug_key" ON "CaseStudyContent"("caseSlug");
