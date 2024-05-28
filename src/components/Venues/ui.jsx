import { cn } from "../../utils/utils";

export function VenuesGrid({ className, children }) {
  return (
    <div
      className={cn(
        " grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
