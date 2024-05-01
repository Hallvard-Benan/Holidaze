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
      <div className="col-span-2 flex justify-between">
        <input
          type="number"
          min={1}
          name="guests"
          className="border p-2"
          placeholder="1 Guests"
        />
        <div>
          <button
            type="button"
            className="h-[45px] w-[45px] rounded-full border border-black text-xl font-bold"
          >
            +
          </button>
          <button
            type="button"
            className="h-[45px] w-[45px] rounded-full border border-black text-xl font-bold"
          >
            -
          </button>
        </div>
      </div>
      <div className="col-span-2 flex justify-between">
        <input
          type="number"
          min={1}
          name="guests"
          className="border p-2"
          placeholder="Price"
        />
        <div>
          <button
            type="button"
            className="h-[45px] w-[45px] rounded-full border border-black text-xl font-bold"
          >
            +
          </button>
          <button
            type="button"
            className="h-[45px] w-[45px] rounded-full border border-black text-xl font-bold"
          >
            -
          </button>
        </div>
      </div>
      <button>search</button>
    </form>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func,
};
