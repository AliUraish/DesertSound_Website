#!/usr/bin/env node
import https from 'https';
import fs from 'fs';

const WP_API = 'https://desertsound.com.pk/wp-json/wp/v2/posts';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function htmlToMarkdown(html) {
  // Remove script and style tags
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Convert headings
  text = text.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n');
  text = text.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '### $1\n');
  text = text.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n');
  text = text.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '### $1\n');
  text = text.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '### $1\n');
  text = text.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '### $1\n');
  
  // Convert strong/bold
  text = text.replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**');
  
  // Convert links - convert absolute desertsound.com.pk links to relative
  text = text.replace(/<a[^>]*href=["']https?:\/\/(?:www\.)?desertsound\.com\.pk([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  text = text.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)');
  
  // Convert lists
  text = text.replace(/<ul[^>]*>/gi, '\n');
  text = text.replace(/<\/ul>/gi, '\n');
  text = text.replace(/<ol[^>]*>/gi, '\n');
  text = text.replace(/<\/ol>/gi, '\n');
  text = text.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
  
  // Convert paragraphs
  text = text.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
  
  // Convert line breaks
  text = text.replace(/<br[^>]*>/gi, '\n');
  
  // Remove remaining HTML tags
  text = text.replace(/<[^>]+>/g, '');
  
  // Decode HTML entities
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#039;/g, "'");
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&#8217;/g, "'");
  text = text.replace(/&#8220;/g, '"');
  text = text.replace(/&#8221;/g, '"');
  text = text.replace(/&#8211;/g, '–');
  text = text.replace(/&#8212;/g, '—');
  text = text.replace(/&#038;/g, '&');
  
  // Clean up multiple newlines
  text = text.replace(/\n\n\n+/g, '\n\n');
  
  // Trim whitespace
  text = text.trim();
  
  return text;
}

function cleanDescription(desc) {
  // Remove HTML tags from description
  let text = desc.replace(/<[^>]+>/g, '');
  // Decode entities
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&#039;/g, "'");
  text = text.replace(/&#8217;/g, "'");
  text = text.replace(/&#8220;/g, '"');
  text = text.replace(/&#8221;/g, '"');
  text = text.replace(/&#038;/g, '&');
  text = text.replace(/&nbsp;/g, ' ');
  return text.trim();
}

async function fetchAllPosts() {
  const allPosts = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    console.error(`Fetching page ${page}...`);
    const posts = await fetchJson(`${WP_API}?per_page=100&page=${page}`);
    
    if (!Array.isArray(posts) || posts.length === 0) {
      hasMore = false;
    } else {
      allPosts.push(...posts);
      page++;
    }
  }
  
  console.error(`Fetched ${allPosts.length} posts total`);
  
  return allPosts.map(post => {
    const yoast = post.yoast_head_json || {};
    const featuredMedia = yoast.og_image?.[0]?.url || '';
    
    return {
      slug: `/${post.slug}`,
      title: yoast.title || post.title.rendered,
      description: cleanDescription(yoast.description || yoast.og_description || ''),
      h1: htmlToMarkdown(post.title.rendered),
      body: htmlToMarkdown(post.content.rendered),
      image: featuredMedia,
      date: post.date
    };
  });
}

// Main
fetchAllPosts()
  .then(posts => {
    fs.writeFileSync('/tmp/wordpress-posts.json', JSON.stringify(posts, null, 2));
    console.error(`Saved ${posts.length} posts to /tmp/wordpress-posts.json`);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
