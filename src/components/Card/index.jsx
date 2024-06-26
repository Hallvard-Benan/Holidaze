import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";

import { CardImageCarousel } from "../ui/cardImageCarousel";
import BookingsModal from "../ui/bookinigModal";

export default function Card({
  images,
  heading,
  price,
  href,
  isMine,
  bookings,
  location,
  rating,
}) {
  return (
    <div className="group grid h-[450px]  grid-rows-[300px,auto] overflow-hidden rounded-lg border border-gray-200 bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <CardImageCarousel images={images} href={href} className={" h-[300px]"} />
      <div className="flex max-w-full flex-col justify-between overflow-hidden p-4">
        <Link
          to={href}
          className="flex w-full justify-between overflow-hidden break-words"
        >
          <h5 className="whitespace-no-wrap mb-2 line-clamp-2 max-w-full overflow-hidden break-words text-xl font-bold tracking-tight text-foreground">
            {heading}
          </h5>
          {rating > 0 && (
            <p className=" flex items-center gap-1">
              <FaRegStar />
              <span className="text-muted-foreground">{rating}</span>{" "}
            </p>
          )}
        </Link>
        <div className="">
          <p className="text-top line-clamp-1 text-muted-foreground">
            {location.city &&
              location.city !== "string" &&
              location?.city + ", " + location?.country}
          </p>
          <div className="flex flex-wrap justify-between">
            <p>
              {price.toLocaleString()} kr{" "}
              <span className="text-muted-foreground">/ night</span>
            </p>
            {isMine && (
              <>
                {bookings?.length > 0 ? (
                  <BookingsModal bookings={bookings} />
                ) : (
                  <p className="text-sm text-muted-foreground">No bookings</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
