import { cn } from "../../utils/utils";

export default function Container({ className, children }) {
  return (
    <div
      className={cn(
        " sm:w-calc-md mx-auto grid w-calc gap-6 overflow-hidden py-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
