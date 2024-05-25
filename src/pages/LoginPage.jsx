import { useEffect } from "react";
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export async function loader({ params }) {
  const formVersion = params.formVersion;
  return { formVersion };
}

export default function LoginPage() {
  const { formVersion } = useLoaderData();
  useEffect(() => {
    document.title = "Holiday Helper | Login";
  }, []);
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
