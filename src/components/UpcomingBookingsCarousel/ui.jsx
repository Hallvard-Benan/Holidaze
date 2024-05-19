// import React from "react";
// import ProgressBar from "../ui/progressBar";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../ui/carousel";
// import { cn, formatDate } from "../../utils/utils";
// import { CardImageCarousel } from "../ui/cardImageCarousel";
// import CountdownTimer from "../ui/countDown";

// export default function BookingsCarouselUi({ bookings }) {
//   const [api, setApi] = React.useState();
//   const [current, setCurrent] = React.useState(0);
//   const [count, setCount] = React.useState(0);

//   React.useEffect(() => {
//     if (!api) {
//       return;
//     }

//     setCount(api.scrollSnapList().length);
//     setCurrent(api.selectedScrollSnap() + 1);

//     api.on("select", () => {
//       setCurrent(api.selectedScrollSnap() + 1);
//     });
//   }, [api]);

//   return (
//     <div className="w-full overflow-hidden rounded-lg  p-2">
//       <div className="flex justify-between">
//         <h3>Your Upcoming Trips:</h3> See all
//       </div>
//       <Carousel
//         opts={{ slidesToScroll: "auto", watchResize: true, loop: true }}
//         setApi={setApi}
//         className="relative  w-full pb-8 "
//       >
//         <CarouselContent className="  flex w-full">
//           {bookings.map((booking, index) => (
//             <CarouselItem
//               key={index}
//               className=" flex aspect-video w-[calc(100%+1rem)] items-center justify-center md:basis-1/2"
//             >
//               <div className="bg-card relative flex h-full w-full max-w-full flex-col justify-end gap-2 overflow-clip  rounded-md  p-2">
//                 <div className="z-10 flex flex-col justify-between text-white">
//                   <h3 className="text-xl font-medium">{booking.venue.name}</h3>
//                   <div className="flex gap-2">
//                     in
//                     <CountdownTimer endsAt={booking.dateFrom} />
//                   </div>
//                 </div>
//                 <div className="z-10 w-full">
//                   <ProgressBar start={booking.created} end={booking.dateTo} />
//                 </div>
//                 <div className="absolute right-0 top-0 z-0 h-full w-full ">
//                   <div className="absolute h-full w-full bg-gradient-to-b from-gray-800/10 to-gray-800/80"></div>
//                   <img
//                     src={booking.venue.media[0].url}
//                     alt={booking.venue.media[0].alt}
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="bottom-0 left-0" />
//         <CarouselNext className="absolute bottom-0 right-0" />
//       </Carousel>
//     </div>
//   );
// }
import React from "react";
import ProgressBar from "../ui/progressBar";
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
import { Link } from "react-router-dom";

export default function BookingsCarouselUi({
  bookings,
  userName = "venueman",
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

  return (
    <div className="flex w-full flex-col gap-8 overflow-hidden">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Upcoming trip:</h3>{" "}
        {/* todo replace generic link */}
        <Link to={`/profiles/${userName}/bookings`}>See all</Link>
      </div>
      <Carousel
        opts={{ slidesToScroll: "auto", watchResize: true, loop: true }}
        setApi={setApi}
        className="relative  w-full  "
      >
        <CarouselContent className="  flex w-full ">
          {bookings.map((booking, index) => (
            <CarouselItem
              key={index}
              className=" flex aspect-video max-h-[264px] w-[calc(100%+1rem)] items-center justify-center pl-4 md:max-h-full"
            >
              <Link
                to={`/venues/${booking.venue.id}`}
                className="bg-card relative flex h-full w-full max-w-full flex-col justify-end gap-2 overflow-hidden  rounded-xl  p-2"
              >
                <div className="z-10 flex w-fit flex-col justify-between overflow-hidden text-white">
                  <h3 className=" w-full text-xl font-medium">
                    {booking.venue.name}
                  </h3>
                  <div className="flex w-full max-w-full gap-2 sm:hidden ">
                    in
                    <CountdownTimer endsAt={booking.dateFrom} />
                  </div>
                </div>
                <div className="z-10 w-full">
                  <ProgressBar start={booking.created} end={booking.dateTo} />
                </div>
                <div className="absolute right-0 top-0 z-0 h-full w-full ">
                  <div className="absolute h-full w-full bg-gradient-to-b from-gray-800/10 to-gray-800/80"></div>
                  <img
                    src={booking.venue.media[0].url}
                    alt={booking.venue.media[0].alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bottom-0 left-0" />
        <CarouselNext className="absolute bottom-0 right-0" />
      </Carousel>
    </div>
  );
}
