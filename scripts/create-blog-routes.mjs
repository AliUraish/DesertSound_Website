#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Read all blog posts from the JSON
const posts = JSON.parse(fs.readFileSync('/tmp/new-blog-posts.json', 'utf8'));

// Existing routes (from the 16 ranking posts)
const existingRoutes = new Set([
  '/acoustic-panels-and-soundproofing-tips-for-private-home-cinemas',
  '/creating-the-perfect-acoustic-environment',
  '/home-theater-companies-near-me-are-leveling-up-gaming-setups',
  '/home-theater-design-and-installation-why-is-professional-help-important',
  '/how-to-plan-a-smart-home-theater-in-pakistan-tips-from-desert-sound',
  '/optimal-steps-to-improve-the-sound-experience-of-your-home-theater-designs',
  '/set-home-theater-systems-with-desert-sound-2024',
  '/soundproofing-home-cinema-installation',
  '/the-rise-of-voice-controlled-home-theatre-service-in-pakistan',
  '/transform-your-entertainment-space-with-desert-sound',
  '/turn-any-room-into-a-home-theatre-with-smart-automation',
  '/voice-controlled-smart-home-systems-explained',
  '/why-decoupled-walls-and-floors-matter-for-complete-sound-isolation',
  '/change-the-way-you-live-by-integrating-smart-home-automation',
  '/home-theatre-and-automation-in-pakistan-how-to-prevent-costly-errors',
  '/how-smart-home-automation-can-simplify-your-daily-life'
]);

const appDir = '/workspace/Frontend/app';

let created = 0;
let skipped = 0;

for (const post of posts) {
  const slug = post.slug;
  
  // Skip if route already exists
  if (existingRoutes.has(slug)) {
    skipped++;
    continue;
  }
  
  // Create directory for the route (remove leading slash)
  const routePath = path.join(appDir, slug.substring(1));
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
  }
  
  // Create page.tsx content
  const pageContent = `import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RankingSeoPageView } from "@/components/ranking-seo-page"
import { getRankingSeoPage } from "@/lib/ranking-seo-content"
import { createMetadata } from "@/lib/seo"

const slug = "${slug}"

const page = getRankingSeoPage(slug)

export const metadata: Metadata = page
  ? {
      ...createMetadata({
        path: slug,
        title: page.title,
        description: page.description,
        image: page.image || undefined,
      }),
      robots: { index: false, follow: false },
    }
  : { title: "Not Found", robots: { index: false, follow: false } }

export default function RankingSeoRoutePage() {
  if (!page) notFound()
  return <RankingSeoPageView page={page} />
}
`;
  
  // Write the page.tsx file
  const pagePath = path.join(routePath, 'page.tsx');
  fs.writeFileSync(pagePath, pageContent);
  created++;
}

console.log(`Created ${created} new route files`);
console.log(`Skipped ${skipped} existing routes`);
