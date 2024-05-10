import PropTypes from "prop-types";
import { Button } from "./button";
export default function Search({ onSearch }) {
  return (
    <form
      onSubmit={onSearch}
      className="flex items-center gap-2 rounded-md bg-muted p-2 px-6"
    >
      <input
        type="text"
        className="rounded-md border p-3 sm:w-60"
        name="search"
        placeholder="What are you looking for?"
      />
      <Button className="h-[48px] text-lg">Search</Button>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func,
};
