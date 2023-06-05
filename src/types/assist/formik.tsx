export const ErrorComponent = (msg: any) => {
  if (Array.isArray(msg)) msg = msg.filter((x) => x !== "").join(", ");
  msg = msg
    .replaceAll('\\"', "")
    .replaceAll('"', "")
    .replace(/\[\s+(.*)\s+\]/g, "$1")
    .replace(/\[([0-9])\]/g, " field #$1")
    .replaceAll("undefined", "[empty]")
    .replaceAll("null", "[empty]");
  return <div className="error">⚠️ {msg}</div>;
};
