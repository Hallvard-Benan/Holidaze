import { Link } from "react-router-dom";
import Search from "../ui/search";
import FiltersSection from "../Filters";

export function HeroSection() {
  return (
    <div
      className="relative flex  h-[80dvh] w-full flex-col justify-between bg-cover bg-center"
      style={{ backgroundImage: "url('/skyline.webp')" }}
    >
      <div className="absolute inset-0  flex bg-black opacity-20"></div>
      <div className="relative mx-auto grid  h-full w-calc content-between justify-items-center gap-4 py-6 text-center">
        <div></div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="w-fit  text-3xl font-extrabold leading-relaxed text-white sm:text-5xl sm:leading-relaxed">
            Find Your Perfect Getaway
          </h1>
          <div className="relative flex w-[50rem] max-w-[80vw] items-center">
            <Search />
            <FiltersSection
              variant="home"
              className={"absolute right-0  h-full"}
            />
          </div>
        </div>
        <div className="  flex justify-center  gap-2 py-6">
          <h2 className="text-white">Earn money Hosting Travelers?</h2>
          <Link
            to="/auth/register"
            className="h-fit rounded-lg border border-secondary-foreground bg-secondary px-4 py-2 text-secondary-foreground"
          >
            Become a host
          </Link>
        </div>
      </div>
    </div>
  );
}
