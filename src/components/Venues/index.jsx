import { useSearchParams } from "react-router-dom";
import Card from "../Card";
import PaginationSection from "../PaginationSection";
import Spinner from "../ui/spinner";
import { useBoundStore } from "../../stores/store";
export default function Venues({ status, error, data, meta }) {
  const updatePageNumber = useBoundStore((state) => state.updatePageNumber);
  const updatePerPage = useBoundStore((state) => state.updatePerPage);
  const perPage = useBoundStore((state) => state.paginationState.perPage);

  if (status === "pending") return <Spinner />;
  if (status === "error") {
    return (
      <div>
        {error.message} {error.response.data.errors[0].message}
      </div>
    );
  }

  if (status === "success" && data && meta) {
    const handlePageChange = (p) => {
      updatePageNumber(p);
    };

    return (
      <>
        <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {data.map((item) => (
            <Card
              key={item.id}
              heading={item.name}
              description={item.description}
              images={item.media}
              price={item.price}
              location={item.location}
              rating={item.rating}
              details={item.price}
              href={`/venues/${item.id}`}
            />
          ))}
        </div>
        <select
          name=""
          id=""
          value={perPage}
          onChange={(e) => {
            updatePerPage(parseInt(e.target.value));
          }}
        >
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <PaginationSection
          onChange={handlePageChange}
          current={meta.currentPage}
          isFirst={meta.isFirstPage}
          isLast={meta.isLastPage}
          previous={meta.previousPage}
          next={meta.nextPage}
          pageCount={meta.pageCount}
        />
      </>
    );
  }
}
