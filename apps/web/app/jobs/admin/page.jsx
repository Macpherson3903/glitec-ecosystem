import { listJobs } from "@/lib/jobs";
import { isJobAdminAuthenticated } from "@/lib/jobAdminAuth";
import JobAdminClient from "./JobAdminClient";

export const dynamic = "force-dynamic";

export default async function JobsAdminPage() {
  const authenticated = await isJobAdminAuthenticated();
  const jobs = authenticated ? await listJobs() : [];
  const jobsWithStatus = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    department: job.department,
    status: job.status,
  }));

  return (
    <JobAdminClient authenticated={authenticated} jobs={jobsWithStatus} />
  );
}
