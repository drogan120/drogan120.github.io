export default function LastUpdated() {
  const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME;
  if (!buildTime) return null;

  const date = new Date(buildTime);
  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return (
    <time dateTime={buildTime} className="block">
      Last updated {formatted}
    </time>
  );
}