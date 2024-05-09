import PropTypes from "prop-types";
import { Button } from "./button";
export default function Search({ onSearch }) {
  return (
    <form onSubmit={onSearch} className="flex items-center gap-2">
      <input
        type="text"
        className="w-60 rounded-md border p-3"
        name="search"
        placeholder="What are you looking for?"
      />
      <Button className="h-[48px]">search</Button>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func,
};
