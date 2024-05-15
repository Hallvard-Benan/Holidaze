import React from "react";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";

import { CardImageCarousel } from "../ui/cardImageCarousel";

export default function Card({
  images,
  heading,
  description,
  price,
  details,
  href,
  location,
  rating,
}) {
  return (
    <div className="bg-card group grid h-[450px] grid-rows-[300px,auto] overflow-hidden rounded-lg border border-gray-200 shadow">
      <CardImageCarousel images={images} href={href} className={" h-[300px]"} />
      <div className="flex max-w-full flex-col justify-between overflow-hidden p-4">
        <Link
          to={href}
          className="flex w-full justify-between overflow-hidden break-words"
        >
          <h5 className="text-foreground whitespace-no-wrap mb-2 line-clamp-2 max-w-full overflow-hidden break-words text-xl font-bold tracking-tight">
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
          <p className="text-muted-foreground text-top line-clamp-1">
            {location.city &&
              location.city !== "string" &&
              location?.city + ", " + location?.country}
          </p>
          <p>
            {price.toLocaleString()} kr{" "}
            <span className="text-muted-foreground">/ night</span>
          </p>
        </div>
      </div>
    </div>
  );
}
