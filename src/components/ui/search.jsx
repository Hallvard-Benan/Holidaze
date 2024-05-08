import PropTypes from "prop-types";
export default function Search({ onSearch }) {
  return (
    <form onSubmit={onSearch} className="flex items-center gap-2">
      <input
        type="text"
        className="rounded-md border p-3"
        name="search"
        placeholder="What are you looking for?"
      />
      <button>search</button>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func,
};
