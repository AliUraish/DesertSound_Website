#!/usr/bin/env node
import fs from 'fs';

// Read the WordPress posts
const wpPosts = JSON.parse(fs.readFileSync('/tmp/wordpress-posts.json', 'utf8'));

// Existing ranking blog posts that should be kept unchanged
const existingRankingPosts = new Set([
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

function cleanBody(body) {
  // Remove WordPress chrome patterns
  let text = body;
  
  // Remove common WP patterns
  text = text.replace(/\n*SCROLL DOWN\s*/gi, '');
  text = text.replace(/\n*by admin\s*/gi, '');
  text = text.replace(/\n*Leave a Reply.*$/gmi, '');
  text = text.replace(/\n*Post navigation.*$/gmi, '');
  text = text.replace(/\n*\[.*?\]\s*$/gm, ''); // Remove shortcodes at end of lines
  text = text.replace(/\n*Filed Under:.*$/gmi, '');
  text = text.replace(/\n*Tagged With:.*$/gmi, '');
  text = text.replace(/\n*Posted in:.*$/gmi, '');
  text = text.replace(/\n*Categories:.*$/gmi, '');
  text = text.replace(/\n*Tags:.*$/gmi, '');
  text = text.replace(/\n*Share this.*$/gmi, '');
  text = text.replace(/\n*Related Posts.*$/gmi, '');
  text = text.replace(/\n*You may also like.*$/gmi, '');
  text = text.replace(/\n*Click to share.*$/gmi, '');
  
  // Remove empty links
  text = text.replace(/\[\]\([^)]*\)/g, '');
  
  // Clean up multiple newlines
  text = text.replace(/\n\n\n+/g, '\n\n');
  
  // Trim
  text = text.trim();
  
  return text;
}

function cleanDescription(desc) {
  // Remove [&hellip;] and other HTML entities
  let text = desc;
  text = text.replace(/\[&hellip;\]/g, '');
  text = text.replace(/&hellip;/g, '...');
  text = text.replace(/\[…\]/g, '');
  text = text.replace(/…/g, '...');
  text = text.trim();
  
  // If description is too short or just says "The simple act...", make a better one
  if (text.length < 50 || text.startsWith('Do you want')) {
    return text;
  }
  
  return text;
}

function extractLinks(body) {
  // Extract internal links from the body
  const linkPattern = /\[([^\]]+)\]\((\/[^)]+)\)/g;
  const links = [];
  const seenHrefs = new Set();
  
  let match;
  while ((match = linkPattern.exec(body)) !== null) {
    const [, label, href] = match;
    // Only include service pages and main pages
    if (href.startsWith('/service/') || href.startsWith('/contact') || href.startsWith('/about')) {
      if (!seenHrefs.has(href)) {
        links.push({ label, href });
        seenHrefs.add(href);
      }
    }
  }
  
  // If no links found, add default ones
  if (links.length === 0) {
    links.push(
      { label: 'Home theatre design and installation', href: '/service/home-theatre-design-and-installation/' },
      { label: 'Contact us', href: '/contact-us/' }
    );
  }
  
  return links.slice(0, 4); // Max 4 links
}

// Process posts
const newBlogPosts = [];
const keptPosts = [];

for (const post of wpPosts) {
  const cleanedBody = cleanBody(post.body);
  const cleanedDesc = cleanDescription(post.description);
  const links = extractLinks(cleanedBody);
  
  const processedPost = {
    slug: post.slug,
    title: post.title,
    description: cleanedDesc,
    h1: post.h1,
    body: cleanedBody,
    faqs: [],
    links: links,
    image: post.image || undefined
  };
  
  if (existingRankingPosts.has(post.slug)) {
    keptPosts.push(post.slug);
  } else {
    newBlogPosts.push(processedPost);
  }
}

// Output the results
console.log(`Kept ${keptPosts.length} existing ranking posts unchanged:`);
keptPosts.forEach(slug => console.log(`  ${slug}`));

console.log(`\nProcessed ${newBlogPosts.length} new blog posts to add`);

// Write the new posts to a file for manual review
fs.writeFileSync('/tmp/new-blog-posts.json', JSON.stringify(newBlogPosts, null, 2));
console.log('\nSaved new blog posts to /tmp/new-blog-posts.json');

// Also create a TypeScript snippet
let tsContent = 'export const newBlogPosts: RankingSeoPage[] = [\n';
for (const post of newBlogPosts) {
  tsContent += '  {\n';
  tsContent += `    "slug": ${JSON.stringify(post.slug)},\n`;
  tsContent += `    "title": ${JSON.stringify(post.title)},\n`;
  tsContent += `    "description": ${JSON.stringify(post.description)},\n`;
  tsContent += `    "h1": ${JSON.stringify(post.h1)},\n`;
  tsContent += `    "body": ${JSON.stringify(post.body)},\n`;
  tsContent += `    "faqs": [],\n`;
  tsContent += `    "links": ${JSON.stringify(post.links, null, 6).replace(/\n/g, '\n    ')},\n`;
  if (post.image) {
    tsContent += `    "image": ${JSON.stringify(post.image)}\n`;
  }
  tsContent += '  },\n';
}
tsContent += ']\n';

fs.writeFileSync('/tmp/new-blog-posts.ts', tsContent);
console.log('Saved TypeScript snippet to /tmp/new-blog-posts.ts');
