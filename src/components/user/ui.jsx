import { Link } from "react-router-dom";

function ProfileUi({ name, avatar, credits, wins, _count, venueManager }) {
  return (
    <div className="grid max-w-full gap-4 overflow-hidden">
      <div className="grid gap-2 md:flex md:justify-center md:gap-4">
        <div className="grid justify-items-center gap-2">
          <img
            src={
              avatar
                ? avatar.url
                : "https://cdn-icons-png.flaticon.com/512/17/17004.png"
            }
            alt={avatar ? avatar.alt : "profile image"}
            className={` h-44 rounded-lg transition-opacity duration-200 md:h-72 `}
          />
        </div>

        <div className="flex flex-col justify-center gap-4">
          <h1 className="break-all text-center text-4xl md:w-[400px] md:text-5xl">
            {name}
          </h1>
          <div className="mx-auto flex justify-evenly gap-16 rounded-lg bg-white p-4 md:gap-20">
            <div>
              <p className="text-center text-lg font-medium md:text-xl">
                {venueManager && <Link> My venues</Link>}
              </p>
              <p className="text-muted-foreground text-sm md:text-base">
                Listings
              </p>
            </div>
            <div>
              <p className="text-center text-lg font-medium md:text-xl">
                ${credits}
              </p>
              <p className="text-muted-foreground text-sm md:text-base">
                Credits
              </p>
            </div>
            <div>
              <p className="text-center text-lg font-medium md:text-xl">
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
