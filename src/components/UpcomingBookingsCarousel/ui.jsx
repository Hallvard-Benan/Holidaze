import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { cn, formatDate } from "../../utils/utils";
import { CardImageCarousel } from "../ui/cardImageCarousel";
import CountdownTimer from "../ui/countDown";

export default function BookingsCarouselUi({ bookings }) {
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
    <div className="max-w-full overflow-hidden rounded-lg border p-2">
      <div className="flex justify-between">
        <h3>Your Upcoming Trips:</h3> See all
      </div>
      <Carousel
        opts={{ slidesToScroll: "auto", watchResize: true, loop: true }}
        setApi={setApi}
        className="relative w-full pb-8"
      >
        <CarouselContent className=" w-full">
          {bookings.map((booking, index) => (
            <CarouselItem key={index} className=" pl-2 md:basis-1/2">
              <div className="bg-card flex gap-2 rounded-md border p-2">
                <div className="flex flex-col justify-between">
                  <h3 className="text-xl font-semibold">
                    {booking.venue.name}
                  </h3>
                  <div className="flex gap-2">
                    in
                    <CountdownTimer endsAt={booking.dateFrom} />
                  </div>
                  <p>
                    From {formatDate(booking.dateFrom)} To{" "}
                    {formatDate(booking.dateTo)}{" "}
                  </p>
                </div>

                <CardImageCarousel
                  className={"h-150px over rounded-md"}
                  images={booking.venue.media}
                  href={`/venues/${booking.venue.id}`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bottom-0 left-0" />
        <CarouselNext className="absolute bottom-0 right-0" />
      </Carousel>
    </div>
  );
}
