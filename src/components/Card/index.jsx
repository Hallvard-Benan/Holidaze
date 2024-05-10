import React from "react";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { cn } from "../../utils/utils";

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
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const isLastImage = current === images?.length;
  const isFirstImage = current === 1;

  return (
    <div className="bg-card group grid h-[450px] grid-rows-[300px,auto] overflow-hidden rounded-lg border border-gray-200 shadow">
      <Carousel setApi={setApi} className="m-0  w-full">
        <CarouselContent className=" m-0 h-[300px] w-full">
          {images?.map((img, index) => (
            <CarouselItem key={index} className="m-0 h-full w-full p-0 ">
              <Link to={href}>
                <img
                  src={img.url}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images?.length > 1 && (
          <>
            {!isFirstImage && (
              <CarouselPrevious className="absolute bottom-1/2 left-0 opacity-0 transition-all duration-300 hover:scale-105 disabled:opacity-0 group-hover:opacity-100" />
            )}
            {!isLastImage && (
              <CarouselNext className=" absolute bottom-1/2 right-0 opacity-0 transition-all duration-300  hover:scale-105 disabled:opacity-0 group-hover:opacity-100" />
            )}
            <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {Array.from(Array(images?.length).keys()).map((i) => (
                <div
                  className={cn(
                    " h-2 w-2 rounded-full bg-muted opacity-65",
                    i === current - 1 && "opacity-100",
                  )}
                  key={i}
                ></div>
              ))}
            </div>
          </>
        )}
      </Carousel>
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
