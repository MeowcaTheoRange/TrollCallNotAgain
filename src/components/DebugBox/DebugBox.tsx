import "./DebugBox.css";

export default function DebugBox({ text }: { text: object }) {
  return <div className="DebugBox">{JSON.stringify(text, null, 2)}</div>;
}
