import { isJobAdminAuthenticated } from "@/lib/jobAdminAuth";
import { createJob, deleteJob, listJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isJobAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const jobs = await listJobs();
  return Response.json({
    jobs: jobs.map((job) => ({
      id: job.id,
      title: job.title,
      department: job.department,
      status: job.status,
    })),
  });
}

export async function POST(req) {
  try {
    if (!(await isJobAdminAuthenticated())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const job = await createJob(body);
    return Response.json({ success: true, job }, { status: 201 });
  } catch (err) {
    console.error(err);
    const msg = err instanceof Error ? err.message : "";
    if (msg === "Title is required") {
      return Response.json({ error: msg }, { status: 400 });
    }
    if (msg.includes("MongoDB URI missing")) {
      return Response.json({ error: msg }, { status: 503 });
    }
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    if (!(await isJobAdminAuthenticated())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const jobId = body.jobId;
    if (!jobId) {
      return Response.json({ error: "Missing job id" }, { status: 400 });
    }

    const removed = await deleteJob(jobId);
    if (!removed) {
      return Response.json({ error: "Unknown job" }, { status: 404 });
    }
    return Response.json({ success: true, jobId });
  } catch (err) {
    console.error(err);
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("MongoDB URI missing")) {
      return Response.json({ error: msg }, { status: 503 });
    }
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
