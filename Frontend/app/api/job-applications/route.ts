import { NextResponse } from "next/server"
import { positions } from "@/lib/careers-data"
import { ensureSubmissionSchema, getDatabase } from "@/lib/database"
import { emailLayout, sendNotification } from "@/lib/notifications"

export const runtime = "nodejs"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const allowedResumeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
])
const maximumResumeSize = 5 * 1024 * 1024
const experienceOptions = new Set(["3-4 years", "5-7 years", "8-10 years", "10+ years"])

function isValidHttpUrl(value: string, maximumLength = 500) {
  try {
    const url = new URL(value)
    return ["http:", "https:"].includes(url.protocol) && value.length <= maximumLength
  } catch {
    return false
  }
}

function isValidGitHubUrl(value: string) {
  if (!isValidHttpUrl(value)) return false

  const url = new URL(value)
  const hostname = url.hostname.toLowerCase()
  return ["github.com", "www.github.com"].includes(hostname) && url.pathname.split("/").filter(Boolean).length > 0
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim().toLowerCase()
    const linkedin = String(formData.get("linkedin") ?? "").trim()
    const github = String(formData.get("github") ?? "").trim()
    const previousWork = String(formData.get("previousWork") ?? "").trim()
    const experience = String(formData.get("experience") ?? "").trim()
    const projectImpact = String(formData.get("projectImpact") ?? "").trim()
    const motivation = String(formData.get("motivation") ?? "").trim()
    const jobSlug = String(formData.get("jobSlug") ?? "").trim()
    const resume = formData.get("resume")

    if (formData.get("website")) {
      return NextResponse.json({ ok: true })
    }

    const position = positions.find((item) => item.slug === jobSlug)
    if (!position) {
      return NextResponse.json({ error: "This job position could not be found." }, { status: 400 })
    }
    if (!name || name.length > 150) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 })
    }
    if (!emailPattern.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    }

    if (!isValidHttpUrl(linkedin)) {
      return NextResponse.json({ error: "Please enter a valid LinkedIn URL." }, { status: 400 })
    }
    if (!isValidGitHubUrl(github)) {
      return NextResponse.json({ error: "Please enter a valid GitHub profile URL." }, { status: 400 })
    }
    if (!isValidHttpUrl(previousWork)) {
      return NextResponse.json(
        { error: "Please enter a valid link to your previous work." },
        { status: 400 },
      )
    }
    if (!experienceOptions.has(experience)) {
      return NextResponse.json({ error: "Please select your experience level." }, { status: 400 })
    }
    if (projectImpact.length < 80 || projectImpact.length > 2000) {
      return NextResponse.json(
        { error: "Please describe your project in 80 to 2,000 characters." },
        { status: 400 },
      )
    }
    if (motivation.length < 50 || motivation.length > 1500) {
      return NextResponse.json(
        { error: "Please describe your interest in 50 to 1,500 characters." },
        { status: 400 },
      )
    }

    if (!(resume instanceof File) || resume.size === 0) {
      return NextResponse.json({ error: "Please attach your resume." }, { status: 400 })
    }
    if (!allowedResumeTypes.has(resume.type) || resume.size > maximumResumeSize) {
      return NextResponse.json(
        { error: "Resume must be a PDF, DOC, or DOCX file no larger than 5 MB." },
        { status: 400 },
      )
    }

    const resumeBytes = new Uint8Array(await resume.arrayBuffer())

    await ensureSubmissionSchema()
    const sql = getDatabase()
    const rows = await sql`
      INSERT INTO job_applications (
        job_slug,
        job_title,
        job_location,
        applicant_name,
        email,
        linkedin_url,
        github_url,
        previous_work_url,
        experience,
        project_impact,
        motivation,
        resume_name,
        resume_type,
        resume_size,
        resume_data
      ) VALUES (
        ${position.slug},
        ${position.title},
        ${position.location},
        ${name},
        ${email},
        ${linkedin},
        ${github},
        ${previousWork},
        ${experience},
        ${projectImpact},
        ${motivation},
        ${resume.name},
        ${resume.type},
        ${resume.size},
        ${resumeBytes}
      )
      RETURNING id
    `
    const id = String(rows[0].id)

    try {
      await sendNotification({
        subject: `New job application: ${position.title} — ${name}`,
        replyTo: email,
        html: emailLayout("New Job Application", [
          ["Position", position.title],
          ["Location", position.location],
          ["Applicant", name],
          ["Email", email],
          ["LinkedIn", linkedin],
          ["GitHub", github],
          ["Previous work", previousWork],
          ["Experience", experience],
          ["Project ownership", projectImpact],
          ["Why Desert Sound", motivation],
          ["Resume", `${resume.name} (${Math.ceil(resume.size / 1024)} KB) — saved in Neon`],
          ["Application ID", id],
        ]),
      })
      await sql`UPDATE job_applications SET notification_status = 'sent' WHERE id = ${id}`
    } catch (error) {
      const notificationError = error instanceof Error ? error.message.slice(0, 1000) : "Unknown email error"
      await sql`
        UPDATE job_applications
        SET notification_status = 'failed', notification_error = ${notificationError}
        WHERE id = ${id}
      `
      console.error("Job application notification failed", { id, error: notificationError })
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error("Job application failed", error)
    return NextResponse.json({ error: "Your application could not be submitted. Please try again." }, { status: 500 })
  }
}
