import * as React from "react";
import { cn } from "../../utils/utils";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn(className)} {...props} />
));
Label.displayName = "Label";

export { Label };
