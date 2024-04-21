import { getUser } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const userName = params.userName;
  return { userName };
}

export default function UserPage() {
  const { userName } = useLoaderData();

  const { data, error, status } = useQuery({
    queryKey: ["user", userName],
    queryFn: () => getUser(userName),
  });

  if (status === "pending") return <div>---</div>;
  if (status === "error") return <div>error {error.message}</div>;

  return <div>UserPage {data.data.data.name}</div>;
}
