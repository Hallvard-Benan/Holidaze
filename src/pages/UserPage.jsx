import { useLoaderData } from "react-router-dom";
import Spinner from "../components/ui/spinner";
import ProfileUi from "../components/user/ui";
import { useBoundStore } from "../stores/store.js";
import useUser from "../hooks/useUser.js";

export async function loader({ params }) {
  const userName = params.userName;
  return { userName };
}

export default function UserPage() {
  const { userName } = useLoaderData();
  const visitorName = useBoundStore((state) => state.user.name);
  const isMyProfile = userName === visitorName;

  const { data, error, status } = useUser(userName);

  if (status === "pending") return <Spinner />;

  if (status === "error") {
    console.log("data from component error", data);
    return (
      <div>
        error {error.message}{" "}
        {error.response?.data?.errors.map((e, i) => (
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
          banner={userData.banner}
          name={userData.name}
          bookings={userData.bookings}
          venues={userData.venues}
          avatar={userData.avatar}
          isMyProfile={isMyProfile}
          _count={userData._count}
        />
      </div>
    );
  }
}
