import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { cn } from "../../utils/utils";

export function ImageCarousel({ images, noImage }) {
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

  return (
    <Carousel setApi={setApi} className=" relative w-full">
      <p className="absolute right-0 top-0 z-20 -translate-x-1/2 translate-y-1/2 rounded-md bg-slate-900/50 p-1 text-xs text-white sm:hidden">
        {" "}
        {current} / {count}
      </p>
      <CarouselContent className="aspect-video w-full  sm:h-72 ">
        {images.map((img, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <img
              src={img.url}
              alt={img.alt}
              className={cn(
                " h-full w-full   object-cover sm:aspect-video sm:w-auto sm:rounded-md",
                noImage && "object-contain",
              )}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="hidden justify-between  sm:flex">
        <CarouselPrevious className=" relative" />
        <div className="py-2 text-center text-sm text-muted-foreground">
          <div className="flex justify-center gap-2">
            {images.map((img, index) => (
              <img
                className={cn(
                  "h-[28px] w-[28px]",
                  index !== current - 1 && "opacity-15",
                )}
                key={index}
                src={img.url}
                onClick={() => api.select(index + 1)}
              />
            ))}
          </div>
          {current} / {count}
        </div>

        <CarouselNext className=" relative" />
      </div>
    </Carousel>
  );
}
