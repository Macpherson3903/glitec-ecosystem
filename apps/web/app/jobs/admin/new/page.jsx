import { isJobAdminAuthenticated } from "@/lib/jobAdminAuth";
import JobAdminNewClient from "./JobAdminNewClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Add a job | Glitec",
  robots: { index: false, follow: false },
};

export default async function JobsAdminNewPage() {
  const authenticated = await isJobAdminAuthenticated();
  return <JobAdminNewClient authenticated={authenticated} />;
}
