import { useParams } from "react-router-dom";

export function TimelinePage() {
  const { slug } = useParams();

  return (
    <div>
      <h1>Timeline</h1>
      <p>{slug}</p>
    </div>
  );
}
