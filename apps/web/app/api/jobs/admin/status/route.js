import { isJobAdminAuthenticated } from "@/lib/jobAdminAuth";
import { listJobs, setJobStatus } from "@/lib/jobs";

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

export async function PATCH(req) {
  try {
    if (!(await isJobAdminAuthenticated())) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const { jobId, status } = body;

    if (status !== "open" && status !== "closed") {
      return Response.json({ error: "Invalid status" }, { status: 400 });
    }

    try {
      await setJobStatus(jobId, status);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "Unknown job" || msg === "Invalid job status") {
        return Response.json({ error: msg }, { status: 400 });
      }
      throw err;
    }

    return Response.json({ success: true, jobId, status });
  } catch (err) {
    console.error(err);
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("MongoDB URI missing")) {
      return Response.json({ error: msg }, { status: 503 });
    }
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
