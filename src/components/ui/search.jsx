export default function Search({ onSearch }) {
  return (
    <form onSubmit={onSearch}>
      <input type="text" className="border p-3 rounded-md" name="search" />{" "}
      <button>search</button>
    </form>
  );
}
