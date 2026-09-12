import fs from "node:fs"
import path from "node:path"
import type { RankingSeoPage } from "./ranking-seo-types"

const ARTICLES_DIR = path.join(process.cwd(), "content/articles")

function parseArticleMarkdown(raw: string, filename: string): RankingSeoPage {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    throw new Error(`Invalid article frontmatter in ${filename}`)
  }

  const meta = JSON.parse(match[1])
  const body = match[2].replace(/^\r?\n/, "").replace(/\s+$/, "")

  if (!meta.slug || !meta.title || !meta.h1 || !meta.description) {
    throw new Error(`Missing slug/title/h1/description in ${filename}`)
  }

  return {
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    h1: meta.h1,
    body,
    faqs: meta.faqs ?? [],
    links: meta.links ?? [],
    ...(meta.image ? { image: meta.image } : {}),
  }
}

function readArticlesFromDisk(): RankingSeoPage[] {
  if (!fs.existsSync(ARTICLES_DIR)) {
    throw new Error(`Missing articles folder: ${ARTICLES_DIR}`)
  }

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) =>
      parseArticleMarkdown(fs.readFileSync(path.join(ARTICLES_DIR, name), "utf8"), name),
    )
}

let cachedArticles: RankingSeoPage[] | undefined

export function loadBlogArticles(): RankingSeoPage[] {
  if (process.env.NODE_ENV !== "production") {
    return readArticlesFromDisk()
  }

  return (cachedArticles ??= readArticlesFromDisk())
}
