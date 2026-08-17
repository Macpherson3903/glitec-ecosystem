import connectToDB from "@/lib/mongodb";
import JobVacancy from "@/models/JobVacancy";
import { jobs as seedJobs } from "@/data/jobs";

export const DEFAULT_JOB_STATUS = "open";

function seedFields(seed) {
  return {
    title: seed.title,
    summary: seed.summary,
    description: seed.description,
    responsibilities: seed.responsibilities,
    requirements: seed.requirements,
    employmentType: seed.employmentType,
    location: seed.location,
    department: seed.department,
  };
}

function seedById(id) {
  return seedJobs.find((job) => job.id === id) ?? null;
}

function withStatus(job, status) {
  return {
    ...job,
    status: status === "closed" ? "closed" : DEFAULT_JOB_STATUS,
  };
}

export function serializeJob(doc) {
  if (!doc) return null;
  const seed = seedById(doc.jobId);
  return {
    id: doc.jobId,
    title: doc.title || seed?.title || "",
    summary: doc.summary || seed?.summary || "",
    description: doc.description || seed?.description || "",
    responsibilities:
      Array.isArray(doc.responsibilities) && doc.responsibilities.length
        ? doc.responsibilities
        : seed?.responsibilities || [],
    requirements:
      Array.isArray(doc.requirements) && doc.requirements.length
        ? doc.requirements
        : seed?.requirements || [],
    employmentType: doc.employmentType || seed?.employmentType || "Full-time",
    location: doc.location || seed?.location || "",
    department: doc.department || seed?.department || "",
    status: doc.status === "closed" ? "closed" : DEFAULT_JOB_STATUS,
  };
}

export function slugifyTitle(title) {
  const base = String(title || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return base || `job-${Date.now()}`;
}

export function parseLineList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function needsContent(doc) {
  return !String(doc?.title || "").trim();
}

async function upsertSeedJob(seed, existing) {
  if (!existing) {
    return JobVacancy.create({
      jobId: seed.id,
      ...seedFields(seed),
      status: "open",
    });
  }
  if (needsContent(existing)) {
    return JobVacancy.findOneAndUpdate(
      { jobId: seed.id },
      { $set: seedFields(seed) },
      { new: true }
    );
  }
  return existing;
}

let seedPromise = null;

async function ensureSeeded() {
  if (seedPromise) return seedPromise;
  seedPromise = (async () => {
    await connectToDB();
    const existing = await JobVacancy.find({}).lean();
    const byId = new Map(existing.map((row) => [row.jobId, row]));

    for (const seed of seedJobs) {
      await upsertSeedJob(seed, byId.get(seed.id));
    }
  })().catch((err) => {
    seedPromise = null;
    throw err;
  });
  return seedPromise;
}

export async function listJobs() {
  try {
    await ensureSeeded();
    const rows = await JobVacancy.find({}).sort({ createdAt: 1 }).lean();
    const jobs = rows
      .map(serializeJob)
      .filter((job) => job.id && job.title);
    if (jobs.length > 0) return jobs;
  } catch (err) {
    console.error("Failed to load jobs", err);
  }
  return seedJobs.map((job) => withStatus(job, DEFAULT_JOB_STATUS));
}

export async function getJobById(id) {
  const jobId = decodeURIComponent(String(id || "").trim());
  if (!jobId) return null;
  const seed = seedById(jobId);

  try {
    await ensureSeeded();
    let doc = await JobVacancy.findOne({ jobId }).lean();

    if (seed && (!doc || needsContent(doc))) {
      doc = await upsertSeedJob(seed, doc);
      doc = typeof doc.toObject === "function" ? doc.toObject() : doc;
    }

    if (doc) return serializeJob(doc);
  } catch (err) {
    console.error("Failed to load job", err);
  }

  return seed ? withStatus(seed, DEFAULT_JOB_STATUS) : null;
}

export function resolveJobStatus(statusMap, jobId) {
  return statusMap?.[jobId] === "closed" ? "closed" : DEFAULT_JOB_STATUS;
}

export async function getJobStatusMap() {
  try {
    const jobs = await listJobs();
    return Object.fromEntries(jobs.map((job) => [job.id, job.status]));
  } catch (err) {
    console.error("Failed to load job statuses", err);
    return {};
  }
}

export async function isJobOpen(jobId) {
  const job = await getJobById(jobId);
  return job?.status === "open";
}

export async function setJobStatus(jobId, status) {
  if (status !== "open" && status !== "closed") {
    throw new Error("Invalid job status");
  }

  const id = decodeURIComponent(String(jobId || "").trim());
  if (!id) {
    throw new Error("Unknown job");
  }

  await connectToDB();
  await ensureSeeded();

  const seed = seedById(id);
  const existing = await JobVacancy.findOne({ jobId: id }).lean();

  if (!existing && !seed) {
    throw new Error("Unknown job");
  }

  if (existing) {
    const update = { status };
    if (needsContent(existing) && seed) {
      Object.assign(update, seedFields(seed));
    }
    const doc = await JobVacancy.findOneAndUpdate(
      { jobId: id },
      { $set: update },
      { new: true }
    );
    return doc.status;
  }

  const created = await JobVacancy.create({
    jobId: id,
    ...(seed ? seedFields(seed) : { title: id }),
    status,
  });
  return created.status;
}

export async function createJob(input) {
  const title = String(input.title || "").trim();
  if (!title) {
    throw new Error("Title is required");
  }

  await connectToDB();
  const base = slugifyTitle(title);
  let jobId = base;
  let n = 2;
  while (await JobVacancy.exists({ jobId })) {
    jobId = `${base}-${n}`;
    n += 1;
  }

  const doc = await JobVacancy.create({
    jobId,
    title,
    summary: String(input.summary || "").trim(),
    description: String(input.description || "").trim(),
    responsibilities: parseLineList(input.responsibilities),
    requirements: parseLineList(input.requirements),
    employmentType:
      String(input.employmentType || "").trim() || "Full-time",
    location:
      String(input.location || "").trim() ||
      "Port Harcourt, Rivers State, Nigeria",
    department: String(input.department || "").trim(),
    status: input.status === "closed" ? "closed" : "open",
  });

  return serializeJob(doc.toObject());
}

export async function deleteJob(jobId) {
  if (!jobId) return false;
  await connectToDB();
  const result = await JobVacancy.deleteOne({ jobId });
  return result.deletedCount > 0;
}
