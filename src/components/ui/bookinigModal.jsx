import { DialogHeader, DialogTrigger, Dialog, DialogContent } from "./dialog";
import { Button } from "./button";
import { CiCircleList } from "react-icons/ci";
import { formatDate } from "../../utils/utils";
import { Link } from "react-router-dom";

export default function BookingsModal({ bookings }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative gap-2">
          See Bookings <CiCircleList size={"20px"} />{" "}
          <span className="absolute -right-0 top-0 flex size-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border bg-primary text-primary-foreground">
            {bookings?.length}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95dvh] overflow-y-auto px-0">
        <DialogHeader className={"text-center"}>
          <h2 className="text-center text-xl">Bookings</h2>
        </DialogHeader>
        <div>
          <div className="grid w-full grid-cols-[1fr,1fr,1fr,auto] border-b bg-card px-1 md:px-4">
            <p className="text-center">Costumer</p>
            <p>Check in</p>
            <p>Check Out</p>
            <p>Guests</p>
          </div>
          <div className="grid max-h-full divide-y overflow-y-auto ">
            {" "}
            {bookings?.map((booking) => (
              <div
                className="grid w-full grid-cols-[1fr,1fr,1fr,30px] gap-2 bg-card px-3 py-4 md:p-4"
                key={booking.id}
              >
                <Link
                  to={`/profiles/${booking.customer.name}`}
                  className="test-sm flex flex-col items-center gap-2 sm:text-lg"
                >
                  <h3>{booking.customer.name}</h3>
                  <img
                    src={booking.customer.avatar.url}
                    alt={`${booking.customer.name}'s avatar`}
                    className="size-10 rounded-full object-cover"
                  />
                </Link>
                <p>{formatDate(booking.dateFrom)}</p>
                <p>{formatDate(booking.dateTo)}</p>
                <p> {booking.guests}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
