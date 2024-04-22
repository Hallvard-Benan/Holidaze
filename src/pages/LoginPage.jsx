import LoginForm from "../components/Forms/LoginForm";
import { useLoaderData } from "react-router-dom";
import RegisterForm from "../components/Forms/RegisterForm";
import { Link } from "react-router-dom";
export async function loader({ params }) {
  const formVersion = params.formVersion;
  return { formVersion };
}

export default function LoginPage() {
  const { formVersion } = useLoaderData();

  return (
    <div className="container mx-auto">
      {formVersion === "login" ? (
        <div>
          <LoginForm />
          Not signed up?
          <Link to={"/auth/register"}>Sign up</Link>`
        </div>
      ) : (
        <div>
          <RegisterForm />
          <Link to={"/auth/login"}>Login</Link>`
        </div>
      )}
    </div>
  );
}
