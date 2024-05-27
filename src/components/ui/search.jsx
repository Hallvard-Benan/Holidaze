import PropTypes from "prop-types";

import { FaSearch } from "react-icons/fa";
import { cn } from "../../utils/utils";

export default function Search({ onSearch, variant }) {
  return (
    <form
      onSubmit={onSearch}
      className={cn(
        "relative flex w-full max-w-full items-center gap-2",
        variant === "header" && "text-sm",
      )}
    >
      <input
        type="text"
        className={cn(
          "w-full max-w-full rounded-full border  bg-muted p-3 pl-10 focus-within:bg-card",
          variant === "",
        )}
        name="search"
        placeholder="What are you looking for?"
      />
      <button className="absolute left-4 text-muted-foreground">
        <FaSearch />
      </button>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func,
  variant: PropTypes.string,
};
