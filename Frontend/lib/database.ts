import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

let database: NeonQueryFunction<false, false> | undefined
let schemaPromise: Promise<void> | undefined

export function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured")
  }

  database ??= neon<false, false>(databaseUrl)
  return database
}

export function ensureSubmissionSchema() {
  if (!schemaPromise) {
    schemaPromise = createSubmissionSchema().catch((error) => {
      schemaPromise = undefined
      throw error
    })
  }

  return schemaPromise
}

async function createSubmissionSchema() {
  const sql = getDatabase()

  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      notification_status TEXT NOT NULL DEFAULT 'pending',
      notification_error TEXT
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id BIGSERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      notification_status TEXT NOT NULL DEFAULT 'pending',
      notification_error TEXT
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS job_applications (
      id BIGSERIAL PRIMARY KEY,
      job_slug TEXT NOT NULL,
      job_title TEXT NOT NULL,
      job_location TEXT NOT NULL,
      applicant_name TEXT NOT NULL,
      email TEXT NOT NULL,
      linkedin_url TEXT NOT NULL,
      github_url TEXT NOT NULL DEFAULT '',
      previous_work_url TEXT NOT NULL DEFAULT '',
      experience TEXT NOT NULL DEFAULT '',
      project_impact TEXT NOT NULL DEFAULT '',
      motivation TEXT NOT NULL DEFAULT '',
      resume_name TEXT NOT NULL,
      resume_type TEXT NOT NULL,
      resume_size INTEGER NOT NULL,
      resume_data BYTEA NOT NULL,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      notification_status TEXT NOT NULL DEFAULT 'pending',
      notification_error TEXT
    )
  `

  await sql`
    ALTER TABLE job_applications
      ADD COLUMN IF NOT EXISTS github_url TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS previous_work_url TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS experience TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS project_impact TEXT NOT NULL DEFAULT '',
      ADD COLUMN IF NOT EXISTS motivation TEXT NOT NULL DEFAULT ''
  `
}
