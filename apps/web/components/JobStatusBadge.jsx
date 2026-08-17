export default function JobStatusBadge({ status }) {
  const open = status !== "closed";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        open
          ? "bg-green-100 text-green-800"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {open ? "Open" : "Closed"}
    </span>
  );
}
