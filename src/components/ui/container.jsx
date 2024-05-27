import PropTypes from "prop-types";
import { cn } from "../../utils/utils";

export default function Container({ className, children }) {
  return (
    <div
      className={cn(
        "mx-auto grid w-calc gap-8 overflow-hidden sm:gap-16 md:w-calc-md",
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
