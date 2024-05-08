import { cn } from "../../utils/utils";

export default function Container({ className, children }) {
  return (
    <div className={cn("mx-auto grid w-calc gap-6 py-8", className)}>
      {children}
    </div>
  );
}
