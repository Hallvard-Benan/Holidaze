import { Link, useSearchParams } from "react-router-dom";
import Card from "../Card";
import PaginationSection from "../PaginationSection";
import SkeletonVenues from "./loading";
import { useBoundStore } from "../../stores/store";
import useAllVenues from "../../hooks/useAllVenues";
import { useEffect } from "react";
import { VenuesGrid } from "./ui";
import useSearchVenues from "../../hooks/useSearchVenues";
import { useInView } from "react-intersection-observer";
import Spinner from "../ui/spinner";
import useInfiniteVenues from "../../hooks/useInfiniteVenues";

export default function Venues({ data }) {
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

export function MyVenues({ data }) {
  return (
    <>
      {data.map((item) => (
        <Card
          isMine={true}
          bookings={item.bookings}
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
      <div className="flex flex-col gap-4">
        <div className="relative">
          <div className="absolute bottom-0 h-fit w-fit">
            <select
              name=""
              id=""
              className="bg-inherit text-sm"
              value={perPage}
              onChange={(e) => {
                updatePerPage(parseInt(e.target.value));
              }}
            >
              <option value={12}>12 per page</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
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
        </div>
        <VenuesGrid>
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
        </VenuesGrid>
      </div>
      <div className="relative">
        <div className="absolute bottom-0 h-fit w-fit">
          <select
            name=""
            id=""
            className="bg-inherit text-sm"
            value={perPage}
            onChange={(e) => {
              updatePerPage(parseInt(e.target.value));
            }}
          >
            <option value={12}>12 per page</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
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
      </div>
    </>
  );
}

export function NewVenues() {
  const { status, data, error } = useAllVenues({ perPage: 12, pageNumber: 1 });

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
      <VenuesGrid>
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
      </VenuesGrid>
      <div className="flex w-full justify-center">
        <Link to="/venues" className="rounded-lg border px-4 py-2">
          See all
        </Link>
      </div>
    </>
  );
}

export function SearchedVenues({ search }) {
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useSearchVenues(search);
  const { ref, inView } = useInView();
  const filters = useBoundStore((state) => state.filters);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  if (status === "pending") return <SkeletonVenues />;
  if (status === "error") {
    return (
      <div>
        {error.message} {error.response.data.errors[0].message}
      </div>
    );
  }
  return (
    <div className="grid gap-2">
      <div className="flex gap-2">
        <h1>
          {data.pages[0].data.meta.totalCount} Results for: &rdquo;{search}
          &rdquo;
        </h1>
        <Link to={"/venues"}>X</Link>
      </div>

      <VenuesGrid>
        {data.pages.map((page) => {
          const filteredData = filterVenues(page.data.data, filters);
          return (
            <Venues
              key={page?.data.meta?.currentPage}
              meta={page?.data.meta}
              data={filteredData}
              error={error}
              status={status}
            />
          );
        })}
      </VenuesGrid>
      <div ref={ref}>
        {isFetchingNextPage && (
          <div className="p-8">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export function FilteredVenues() {
  const { ref, inView } = useInView();
  const filters = useBoundStore((state) => state.filters);
  const { data, error, status, isFetchingNextPage, fetchNextPage } =
    useInfiniteVenues();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (status === "pending") return <SkeletonVenues />;
  if (status === "error") {
    return (
      <div>
        {error.message} {error.response.data.errors[0].message}
      </div>
    );
  }
  if (status === "success" && data)
    return (
      <VenuesGrid>
        {data?.pages?.map((page) => {
          const filteredData = filterVenues(page.data.data, filters);
          return (
            <Venues
              key={page.data.meta.currentPage}
              data={filteredData}
              meta={page.data.meta}
            />
          );
        })}
        <div ref={ref}>
          {isFetchingNextPage && (
            <div className="p-8">
              <Spinner />
            </div>
          )}
        </div>
      </VenuesGrid>
    );
}

function filterVenues(data, filters) {
  const filteredVenues = data.filter((item) => {
    const priceInRange =
      item.price <= filters.maxPrice && item.price >= filters.minPrice;
    const maxGuestsInRange = item.maxGuests >= filters.maxGuests;
    const petsMatch = !filters.pets || item.meta.pets === filters.pets;
    const wifiMatch = !filters.wifi || item.meta.wifi === filters.wifi;
    const parkingMatch =
      !filters.parking || item.meta.parking === filters.parking;
    const breakfastMatch =
      !filters.breakfast || item.meta.breakfast === filters.breakfast;

    return (
      priceInRange &&
      maxGuestsInRange &&
      petsMatch &&
      wifiMatch &&
      parkingMatch &&
      breakfastMatch
    );
  });

  return filteredVenues;
}
