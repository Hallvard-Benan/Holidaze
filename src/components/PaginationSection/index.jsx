import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export default function PaginationSection({
  isLast,
  isFirst,
  current,
  previous,
  next,
  pageCount,
  onChange,
}) {
  return (
    <Pagination className={"flex flex-col items-center gap-2"}>
      <PaginationContent>
        {!isFirst && (
          <>
            <PaginationItem>
              <PaginationPrevious onClick={() => onChange(current - 1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => onChange(1)}>1</PaginationLink>
            </PaginationItem>{" "}
          </>
        )}
        <PaginationItem className="text-primary-foreground bg-primary">
          <PaginationLink>{current}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => onChange(pageCount)}>
            {pageCount}
          </PaginationLink>
        </PaginationItem>
        {!isLast && (
          <PaginationItem>
            <PaginationNext onClick={() => onChange(current + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
      1-10 of 50
    </Pagination>
  );
}
