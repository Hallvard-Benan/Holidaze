import { getUser } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import Spinner from "../components/ui/spinner";
import ProfileUi from "../components/user/ui";

export async function loader({ params }) {
  const userName = params.userName;
  return { userName };
}

export default function UserPage() {
  const { userName } = useLoaderData();

  const { data, error, status } = useQuery({
    queryKey: ["user", userName],
    queryFn: () => getUser({ name: userName }),
  });

  if (status === "pending") return <Spinner />;
  if (status === "error") {
    console.log(error);
    return (
      <div>
        error {error.message}{" "}
        {error.response.data.errors.map((e, i) => (
          <p key={i}>{e.message}</p>
        ))}{" "}
      </div>
    );
  }

  if (status === "success") {
    const userData = data.data.data;
    return (
      <div>
        <ProfileUi
          name={userData.name}
          bookings={userData.bookings}
          avatar={userData.avatar}
          credits={2}
          wins={2}
          _count={userData._count}
        />
      </div>
    );
  }
}
