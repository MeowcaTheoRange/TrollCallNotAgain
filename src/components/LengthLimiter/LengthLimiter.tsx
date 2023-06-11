import "./LengthLimiter.css";

export default function LengthLimiter({
  current,
  max,
  min,
}: {
  current: number;
  max: number;
  min?: number;
}) {
  var limit = current / max; // 100 = 0.01, 1000 = 0.1
  return (
    <span
      className={`LengthLimiter${limit >= 0.75 ? " danger" : ""}${
        limit > 1 ? " error" : ""
      }${min && current < min ? " error" : ""}`}
    >
      {current}/{max}
      {min ? <> (minimum {min})</> : <></>}
    </span>
  );
}
