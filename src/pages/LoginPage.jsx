import { useEffect } from "react";
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useBoundStore } from "../stores/store";

export async function loader({ params }) {
  const formVersion = params.formVersion;
  return { formVersion };
}

export default function LoginPage() {
  const navigate = useNavigate();
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);
  const { formVersion } = useLoaderData();
  useEffect(() => {
    document.title = "Holiday Helper | Login";
  }, []);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  });
  return (
    <div className=" mx-auto flex min-h-[90vh] items-center justify-center">
      {formVersion === "login" ? (
        <div>
          <LoginForm />
        </div>
      ) : (
        <div>
          <RegisterForm />
        </div>
      )}
    </div>
  );
}
