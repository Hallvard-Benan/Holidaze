import { Link } from "react-router-dom";

function ProfileUi({ name, avatar, credits, wins, _count, venueManager }) {
  return (
    <div className="max-w-full grid gap-4 overflow-hidden">
      <div className="grid md:flex md:justify-center gap-2 md:gap-4">
        <div className="grid gap-2 justify-items-center">
          <img
            src={
              avatar
                ? avatar.url
                : "https://cdn-icons-png.flaticon.com/512/17/17004.png"
            }
            alt={avatar ? avatar.alt : "profile image"}
            className={` h-44 rounded-lg md:h-72 transition-opacity duration-200 `}
          />
        </div>

        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-4xl md:text-5xl break-all text-center md:w-[400px]">
            {name}
          </h1>
          <div className="bg-white rounded-lg p-4 flex justify-evenly gap-16 md:gap-20 mx-auto">
            <div>
              <p className="text-lg font-medium text-center md:text-xl">
                {venueManager && <Link> My venues</Link>}
              </p>
              <p className="text-muted-foreground text-sm md:text-base">
                Listings
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-center md:text-xl">
                ${credits}
              </p>
              <p className="text-muted-foreground text-sm md:text-base">
                Credits
              </p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-medium text-center">
                {wins}
              </p>
              <p className="text-muted-foreground text-sm md:text-base">Wins</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUi;
