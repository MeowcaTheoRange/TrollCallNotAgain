export const ErrorComponent = (msg: any) => {
  function checkArray(msg: any): string {
    var str = "";
    if (Array.isArray(msg))
      msg.forEach((item: any) =>
        Array.isArray(item) ? (str += checkArray(item)) : (str += item + ", ")
      );
    else return msg;
    return str;
  }
  msg = checkArray(msg);
  msg = msg
    .replaceAll('\\"', "")
    .replaceAll('"', "")
    .replace(/\[\s+(.*)\s+\]/g, "$1")
    .replace(/\[([0-9])\]/g, " field #$1")
    .replace(/, $/g, "")
    .replaceAll("undefined", "[empty]")
    .replaceAll("null", "[empty]");
  return <div className="error">⚠️ {msg}</div>;
};
