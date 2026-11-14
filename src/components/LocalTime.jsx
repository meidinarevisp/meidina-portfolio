import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export default function LocalTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="local-time" aria-label="Current local time in Yogyakarta">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3.2 2" />
      </svg>
      <span className="local-time-place">Yogyakarta</span>
      <span className="local-time-divider" aria-hidden="true" />
      <time dateTime={now.toISOString()}>{formatter.format(now)} WIB</time>
    </div>
  );
}
