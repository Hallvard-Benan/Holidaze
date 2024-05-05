import { FaWifi } from "react-icons/fa6";
import { CiParking1 } from "react-icons/ci";
import { PiForkKnife, PiPawPrint, PiBed } from "react-icons/pi";
import { createElement } from "react";

export function AmenityIcon({ icon, text }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-2xl text-black">{createElement(icon)}</p>
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  );
}

export default function AmenityIcons({ meta, maxGuests }) {
  const amenities = [
    { name: "Wifi", value: meta.wifi, icon: FaWifi },
    { name: "Parking", value: meta.parking, icon: CiParking1 },
    { name: "Pets", value: meta.pets, icon: PiPawPrint },
    { name: "Breakfast", value: meta.breakfast, icon: PiForkKnife },
    { name: `Up to ${maxGuests} guests`, value: true, icon: PiBed },
  ];

  return (
    <div className="flex gap-4">
      {amenities.map(
        (item) =>
          item.value && (
            <AmenityIcon key={item.name} text={item.name} icon={item.icon} />
          ),
      )}
    </div>
  );
}
