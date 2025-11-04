-- PostgreSQL Schema for GetExpo3
-- Run this in Supabase SQL Editor to create all tables

-- Enable UUID extension (optional, for future use)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist (for fresh install)
DROP TABLE IF EXISTS "SolutionStep" CASCADE;
DROP TABLE IF EXISTS "SolutionType" CASCADE;
DROP TABLE IF EXISTS "CaseStudyContent" CASCADE;
DROP TABLE IF EXISTS "CaseStudy" CASCADE;
DROP TABLE IF EXISTS "Position" CASCADE;
DROP TABLE IF EXISTS "ContactInfo" CASCADE;
DROP TABLE IF EXISTS "ContactContent" CASCADE;
DROP TABLE IF EXISTS "StatItem" CASCADE;
DROP TABLE IF EXISTS "StatsContent" CASCADE;
DROP TABLE IF EXISTS "LogoImage" CASCADE;
DROP TABLE IF EXISTS "GeneralImage" CASCADE;
DROP TABLE IF EXISTS "Settings" CASCADE;
DROP TABLE IF EXISTS "HomeContent" CASCADE;
DROP TABLE IF EXISTS "Admin" CASCADE;

-- Admin authentication table
CREATE TABLE "Admin" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Home page hero section
CREATE TABLE "HomeContent" (
    "id" SERIAL PRIMARY KEY,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Position/Journey tabs (3 sections)
CREATE TABLE "Position" (
    "id" SERIAL PRIMARY KEY,
    "slug" VARCHAR(255) NOT NULL UNIQUE,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "calendlyLink" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Case studies
CREATE TABLE "CaseStudy" (
    "id" SERIAL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "result1" TEXT NOT NULL,
    "result2" TEXT NOT NULL,
    "result3" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Solution pages (3 types)
CREATE TABLE "SolutionType" (
    "id" SERIAL PRIMARY KEY,
    "slug" VARCHAR(255) NOT NULL UNIQUE,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "calendlyLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Solution steps (multiple steps per solution type)
CREATE TABLE "SolutionStep" (
    "id" SERIAL PRIMARY KEY,
    "solutionTypeId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stepOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SolutionStep_solutionTypeId_fkey" 
        FOREIGN KEY ("solutionTypeId") 
        REFERENCES "SolutionType"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

-- Contact section info
CREATE TABLE "ContactInfo" (
    "id" SERIAL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "icon" TEXT,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Contact page content
CREATE TABLE "ContactContent" (
    "id" SERIAL PRIMARY KEY,
    "mainTitle1" TEXT NOT NULL DEFAULT 'Ready to Scale',
    "mainTitle2" TEXT NOT NULL DEFAULT 'Your Advertising?',
    "mainDescription" TEXT NOT NULL DEFAULT 'Book a free consultation to discover how we can transform your ad campaigns into a profitable growth engine.',
    "benefitsTitle" TEXT NOT NULL DEFAULT 'What You''ll Get',
    "contactTitle" TEXT NOT NULL DEFAULT 'Get in Touch',
    "trustBadge" TEXT NOT NULL DEFAULT 'Join 50+ businesses who''ve scaled their advertising with our proven strategies',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Stats items
CREATE TABLE "StatItem" (
    "id" SERIAL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "suffix" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'DollarSign',
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Stats content
CREATE TABLE "StatsContent" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT 'Our Proven Results',
    "description" TEXT NOT NULL DEFAULT 'See how we''ve transformed campaigns from struggling to scaling by implementing our proprietary systems and data-driven strategies.',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Brand logos for marquee
CREATE TABLE "LogoImage" (
    "id" SERIAL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL UNIQUE,
    "alt" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- General uploaded images
CREATE TABLE "GeneralImage" (
    "id" SERIAL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL UNIQUE,
    "alt" TEXT,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Site settings
CREATE TABLE "Settings" (
    "id" SERIAL PRIMARY KEY,
    "siteName" TEXT NOT NULL DEFAULT 'Get Exposure',
    "siteDescription" TEXT NOT NULL DEFAULT 'Transform Your Ad Spend Into Real Results',
    "defaultCalendlyLink" TEXT NOT NULL DEFAULT 'https://calendly.com/rohittangri/just-starting-out',
    "email" TEXT NOT NULL DEFAULT 'team@getexposure.ca',
    "phone" TEXT NOT NULL DEFAULT '+1 778 712 3301',
    "location" TEXT NOT NULL DEFAULT 'Vancouver, BC, Canada',
    "businessHours" TEXT NOT NULL DEFAULT 'Mon-Fri: 9AM-6PM PST',
    "googleAnalyticsId" TEXT,
    "facebookPixelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Case study content pages
CREATE TABLE "CaseStudyContent" (
    "id" SERIAL PRIMARY KEY,
    "caseSlug" VARCHAR(255) NOT NULL UNIQUE,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "client" TEXT,
    "challenge" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX "Admin_username_idx" ON "Admin"("username");
CREATE INDEX "Position_slug_idx" ON "Position"("slug");
CREATE INDEX "Position_displayOrder_idx" ON "Position"("displayOrder");
CREATE INDEX "CaseStudy_slug_idx" ON "CaseStudy"("slug");
CREATE INDEX "CaseStudy_displayOrder_idx" ON "CaseStudy"("displayOrder");
CREATE INDEX "SolutionType_slug_idx" ON "SolutionType"("slug");
CREATE INDEX "SolutionStep_solutionTypeId_idx" ON "SolutionStep"("solutionTypeId");
CREATE INDEX "SolutionStep_stepOrder_idx" ON "SolutionStep"("stepOrder");
CREATE INDEX "ContactInfo_type_idx" ON "ContactInfo"("type");
CREATE INDEX "ContactInfo_order_idx" ON "ContactInfo"("order");
CREATE INDEX "StatItem_order_idx" ON "StatItem"("order");
CREATE INDEX "LogoImage_order_idx" ON "LogoImage"("order");
CREATE INDEX "CaseStudyContent_caseSlug_idx" ON "CaseStudyContent"("caseSlug");

-- Create function to automatically update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables to auto-update updatedAt
CREATE TRIGGER update_admin_updated_at BEFORE UPDATE ON "Admin" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_homecontent_updated_at BEFORE UPDATE ON "HomeContent" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_position_updated_at BEFORE UPDATE ON "Position" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_casestudy_updated_at BEFORE UPDATE ON "CaseStudy" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_solutiontype_updated_at BEFORE UPDATE ON "SolutionType" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_solutionstep_updated_at BEFORE UPDATE ON "SolutionStep" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contactinfo_updated_at BEFORE UPDATE ON "ContactInfo" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contactcontent_updated_at BEFORE UPDATE ON "ContactContent" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_statitem_updated_at BEFORE UPDATE ON "StatItem" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_statscontent_updated_at BEFORE UPDATE ON "StatsContent" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_logoimage_updated_at BEFORE UPDATE ON "LogoImage" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generalimage_updated_at BEFORE UPDATE ON "GeneralImage" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON "Settings" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_casestudycontent_updated_at BEFORE UPDATE ON "CaseStudyContent" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'All tables created successfully!' AS status;

