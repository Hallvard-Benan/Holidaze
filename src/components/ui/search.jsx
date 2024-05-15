import PropTypes from "prop-types";
import { Button } from "./button";
import { FaSearch } from "react-icons/fa";

export default function Search({ onSearch }) {
  return (
    <form
      onSubmit={onSearch}
      className="relative flex w-full max-w-full items-center gap-2"
    >
      <input
        type="text"
        className="focus-within:bg-card w-full max-w-full rounded-full  border bg-muted p-3 pl-8"
        name="search"
        placeholder="What are you looking for?"
      />
      <button className="text-muted-foreground absolute left-2">
        <FaSearch />
      </button>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func,
};
