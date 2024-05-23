import { Link } from "react-router-dom";
import Search from "../ui/search";

export function HeroSection() {
  return (
    <div
      className="relative flex h-[80dvh] w-full flex-col justify-between bg-cover bg-center"
      style={{ backgroundImage: "url('/skyline.webp')" }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div></div>
      <div className="relative z-10 mx-auto grid w-calc justify-items-center gap-4 py-6 text-center">
        <h1 className="w-fit text-3xl font-extrabold leading-relaxed text-white sm:text-5xl sm:leading-relaxed">
          Find Your Perfect Getaway
        </h1>
        <div className="w-[50rem] max-w-[80vw]">
          <Search />
        </div>
      </div>
      <div className="relative z-10 flex justify-center gap-2 py-6">
        <h2 className="text-white">Earn money Hosting Travelers?</h2>
        <Link
          to="/auth/register"
          className="rounded-lg border border-secondary-foreground bg-secondary px-4 py-2 text-secondary-foreground"
        >
          Become a host
        </Link>
      </div>
    </div>
  );
}
