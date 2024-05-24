import React from "react";
import PropTypes from "prop-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { cn } from "../../utils/utils";
import { Link } from "react-router-dom";

export function CardImageCarousel({ images, href, className }) {
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
    <>
      <Carousel setApi={setApi} className="group  m-0 h-full w-auto">
        <CarouselContent className={cn(" m-0 h-[250px] w-full", className)}>
          {images?.map((img, index) => (
            <CarouselItem key={index} className="m-0 h-full w-full p-0 ">
              <Link to={href}>
                <img
                  loading="lazy"
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
        {!isFirstImage && (
          <CarouselPrevious className="absolute bottom-1/2 left-0 opacity-0 transition-all duration-300 hover:scale-105 disabled:opacity-0 group-hover:opacity-100" />
        )}
        {!isLastImage && (
          <CarouselNext className=" absolute bottom-1/2 right-0 opacity-0 transition-all duration-300  hover:scale-105 disabled:opacity-0 group-hover:opacity-100" />
        )}{" "}
      </Carousel>
    </>
  );
}

CardImageCarousel.propTypes = {
  href: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
