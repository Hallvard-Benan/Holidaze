import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Holiday Helper | 404";
  }, []);
  return (
    <div>
      Error 404 not found
      <Link to={"/"}>To home</Link>
    </div>
  );
}
