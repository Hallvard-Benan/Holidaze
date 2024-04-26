import PropTypes from "prop-types";
export default function Search({ onSearch }) {
  return (
    <form onSubmit={onSearch}>
      <input type="text" className="rounded-md border p-3" name="search" />{" "}
      <button>search</button>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func,
};
