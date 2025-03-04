import { useParams } from "react-router-dom";

import { RatingButtons } from "~/components/RatingButtons";

import { useUser } from "~/hooks/useUser";

export function Timeline() {
  const { slug } = useParams();

  const { data, isError } = useUser(slug || "");

  console.log(data);

  return (
    <div className="flex flex-col items-center gap-6">
      <RatingButtons />
    </div>
  );
}
