import { Link, useParams, useSearchParams } from "react-router-dom";
import Card from "../Card";
import PaginationSection from "../PaginationSection";
import SkeletonVenues from "./loading";
import Spinner from "../ui/spinner";
import { useBoundStore } from "../../stores/store";
import useAllVenues from "../../hooks/useAllVenues";
import { useEffect } from "react";

export default function Venues({ status, error, data, meta }) {
  const updatePageNumber = useBoundStore((state) => state.updatePageNumber);
  const updatePerPage = useBoundStore((state) => state.updatePerPage);
  const perPage = useBoundStore((state) => state.paginationState.perPage);

  return (
    <>
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
    </>
  );
}

export function PaginatedVenues() {
  const updatePageNumber = useBoundStore((state) => state.updatePageNumber);
  const updatePerPage = useBoundStore((state) => state.updatePerPage);
  let [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  const { perPage, pageNumber } = useBoundStore(
    (state) => state.paginationState,
  );
  useEffect(() => {
    if (page) updatePageNumber(parseInt(page));
  }, []);
  const { status, data, error } = useAllVenues({ perPage, pageNumber });

  if (status === "pending") return <SkeletonVenues />;
  if (status === "error") {
    return (
      <div>
        {error.message} {error.response.data.errors[0].message}
      </div>
    );
  }

  const handlePageChange = (value) => {
    updatePageNumber(value);
    setSearchParams({ ...searchParams, page: value });
  };

  const firstOnThisPage = (pageNumber - 1) * perPage + 1;

  return (
    <>
      <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {data?.data.data.map((item) => (
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
      <div>
        <PaginationSection
          onChange={handlePageChange}
          current={data.data.meta.currentPage}
          isFirst={data.data.meta.isFirstPage}
          isLast={data.data.meta.isLastPage}
          perPage={perPage}
          total={data.data.meta.totalCount}
          onThisPage={data.data.data.length}
          firstOnThisPage={firstOnThisPage}
          pageCount={data.data.meta.pageCount}
        />
        <select
          className="w-fit"
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
      </div>
    </>
  );
}

export function NewVenues() {
  const { status, data, error } = useAllVenues({ perPage: 21, pageNumber: 1 });

  if (status === "pending") return <SkeletonVenues />;
  if (status === "error") {
    return (
      <div>
        {error.message} {error.response.data.errors[0].message}
      </div>
    );
  }

  return (
    <>
      <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {data?.data.data.map((item) => (
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
      <div className="flex w-full justify-center">
        <Link to="/venues?page=2" className="rounded-lg border px-4 py-2">
          See all
        </Link>
      </div>
    </>
  );
}
