import { useParams } from "react-router-dom";

import { useUser } from "~/hooks/useUser";

export function Timeline() {
  const { slug } = useParams();

  const { data, isError } = useUser(slug || "");

  console.log(data);
  console.log(isError);

  return (
    <div>
      <h1>Timeline</h1>
      <p>{slug}</p>
    </div>
  );
}
