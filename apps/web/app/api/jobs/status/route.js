import { listJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const jobs = await listJobs();
    const statuses = Object.fromEntries(jobs.map((job) => [job.id, job.status]));
    return Response.json({
      jobs: jobs.map((job) => ({
        id: job.id,
        title: job.title,
        status: job.status,
      })),
      statuses,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ jobs: [], statuses: {} });
  }
}
