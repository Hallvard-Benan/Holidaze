import { FaWifi } from "react-icons/fa6";
import { CiParking1 } from "react-icons/ci";
import { PiForkKnife, PiPawPrint, PiBed } from "react-icons/pi";
import { createElement } from "react";
import { cn } from "../../utils/utils";

export function AmenityIcon({ icon, text }) {
  return (
    <div className="flex items-center gap-6">
      <p className="text-2xl text-black">{createElement(icon)}</p>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

export default function AmenityIcons({ meta, maxGuests, direction }) {
  const amenities = [
    { name: "Free Wifi", value: meta.wifi, icon: FaWifi },
    { name: "Parking", value: meta.parking, icon: CiParking1 },
    { name: "Pets Allowed", value: meta.pets, icon: PiPawPrint },
    { name: "Included Breakfast", value: meta.breakfast, icon: PiForkKnife },
    { name: `Up to ${maxGuests} guests`, value: true, icon: PiBed },
  ];

  return (
    <div
      className={cn(
        "flex w-fit flex-col gap-4 whitespace-nowrap",
        direction === "horizontal" && "flex-col",
      )}
    >
      {amenities.map(
        (item) =>
          item.value && (
            <AmenityIcon key={item.name} text={item.name} icon={item.icon} />
          ),
      )}
    </div>
  );
}
