import { Link } from "react-router-dom";
import Search from "../ui/search";
import FiltersSection from "../Filters";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    navigate(`/venues?search=${searchTerm}`);
  };

  return (
    <div
      className="relative flex h-[85dvh] max-h-[700px] min-h-[375px] w-full flex-col justify-between bg-cover bg-center"
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
            <Search onSearch={handleSearch} />
            <FiltersSection
              onSubmit={() => navigate("/venues")}
              variant="home"
              className={"absolute right-0  h-full"}
            />
          </div>
          <div></div>
        </div>
        <div className="  flex flex-col items-end justify-center  gap-2 py-6">
          <h2 className="text-white">Feeling adventurous?</h2>
          <Link
            to="/venues"
            className="h-fit rounded-lg border border-secondary bg-black/30 px-4 py-2 text-secondary transition-all duration-300 hover:bg-black/50"
          >
            See All Venues
          </Link>
        </div>
      </div>
    </div>
  );
}
