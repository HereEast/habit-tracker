import { useParams } from "next/navigation";

function UserIndex() {
  const params = useParams();

  console.log(params);

  return <div>{params.user}</div>
}

export default UserIndex;