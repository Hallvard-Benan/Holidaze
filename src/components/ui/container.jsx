import PropTypes from "prop-types";
import { cn } from "../../utils/utils";

export default function Container({ className, children }) {
  return (
    <div
      className={cn(
        "sm:w-calc-md mx-auto grid w-calc gap-16 overflow-hidden py-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Container.defaultProps = {
  className: "",
};
