import { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/container";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Holiday Helper | 404";
  }, []);
  return (
    <Container className="flex h-screen flex-col items-center justify-between bg-white text-center">
      <img
        src="/error-ilustration.webp"
        alt=""
        className="w-72 sm:w-80 md:w-96"
      />
      <div className="grid gap-2">
        <h1 className="text-2xl font-semibold">OOPS! Nothing to see here</h1>
        <Link
          className="text-primary-foreground rounded-md bg-primary px-4 py-2"
          to={"/"}
        >
          Back to Homepage
        </Link>
      </div>

      <div className="text-muted-foreground text-sm">
        <a href="https://www.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_7906236.htm#page=3&query=error%20illustration&position=49&from_view=keyword&track=ais_user&uuid=3bc702cb-1a99-474c-99d1-35ac8c1f95d5">
          Image by storyset
        </a>{" "}
        on Freepik
      </div>
    </Container>
  );
}
