export function searchJobs(jobList, query) {
  const q = String(query || "")
    .trim()
    .toLowerCase();
  if (!q) return jobList;
  return jobList.filter((j) => {
    const hay = [
      j.title,
      j.summary,
      j.description,
      ...(j.requirements || []),
      ...(j.responsibilities || []),
      j.department,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
