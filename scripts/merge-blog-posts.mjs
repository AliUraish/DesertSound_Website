#!/usr/bin/env node
import fs from 'fs';

// Read the current ranking-seo-content.ts
const currentContent = fs.readFileSync('/workspace/Frontend/lib/ranking-seo-content.ts', 'utf8');

// Read all blog posts to add (excluding the first one which is already added)
const blogPostsContent = fs.readFileSync('/tmp/blog-posts-only.ts', 'utf8');
const lines = blogPostsContent.split('\n');

// Find the start of the second post (skip the first post)
let startLine = 0;
let braceCount = 0;
let foundFirstPost = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('{') && lines[i].trim() === '{') {
    braceCount++;
    if (braceCount === 1 && !foundFirstPost) {
      foundFirstPost = true;
    } else if (braceCount === 1 && foundFirstPost) {
      startLine = i;
      break;
    }
  }
  if (lines[i].includes('}') && lines[i].trim().startsWith('}')) {
    braceCount--;
  }
}

// Get the remaining posts (from second post onwards)
const remainingPosts = lines.slice(startLine).join('\n');

// Find where to insert in the current content
// We need to find the last closing brace before the export statement
const insertPoint = currentContent.lastIndexOf('\n]\n\nexport function getRankingSeoPage');

if (insertPoint === -1) {
  console.error('Could not find insertion point');
  process.exit(1);
}

// Build the new content
const beforeInsertion = currentContent.substring(0, insertPoint);
const afterInsertion = currentContent.substring(insertPoint);

// The beforeInsertion should end with "  }\n", so we need to add a comma and the remaining posts
let newContent = beforeInsertion;
if (!newContent.endsWith(',\n')) {
  newContent += ',\n';
}
newContent += remainingPosts.trimEnd();
newContent += afterInsertion;

// Write the new content
fs.writeFileSync('/workspace/Frontend/lib/ranking-seo-content.ts', newContent);
console.log('Successfully merged all blog posts into ranking-seo-content.ts');
