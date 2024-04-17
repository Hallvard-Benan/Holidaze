import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      Error 404 not found
      <Link to={"/"}>To home</Link>
    </div>
  );
}
