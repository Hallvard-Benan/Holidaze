import { cn } from "../../utils/utils";
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
  current,
  firstOnThisPage,
  total,
  pageCount,
  perPage,
  onChange,
}) {
  return (
    <Pagination className="flex max-w-fit flex-col items-center gap-2 overflow-y-hidden">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={current === 1}
            onClick={() => onChange(current - 1)}
          />
        </PaginationItem>

        <div className=" flex sm:hidden">
          <PaginationItem>Page {current}</PaginationItem>
        </div>

        <div className="hidden sm:flex">
          <PaginationItem
            className={cn(
              current === 1 &&
                "bg-primary text-primary-foreground hover:bg-primary hover:opacity-80",
            )}
          >
            <PaginationLink onClick={() => onChange(1)}>1</PaginationLink>
          </PaginationItem>
          {current > 4 && pageCount > 7 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <MiddlePages
            pageCount={pageCount}
            current={current}
            onChange={onChange}
          />
          {current < pageCount - 3 && pageCount > 7 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {pageCount > 1 && (
            <PaginationItem>
              <PaginationLink
                isActive={current === pageCount}
                onClick={() => onChange(pageCount)}
              >
                {pageCount}
              </PaginationLink>
            </PaginationItem>
          )}
        </div>

        {!isLast && (
          <PaginationItem>
            <PaginationNext onClick={() => onChange(current + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
      <div className="text-sm text-muted-foreground">
        {firstOnThisPage} to {Math.min(current * perPage, total)} of {total}
      </div>
    </Pagination>
  );
}

function MiddlePages({ pageCount, current, onChange }) {
  const pages = [];
  let startPage, endPage;

  if (pageCount <= 7) {
    startPage = 2;
    endPage = pageCount - 1;
  } else if (current <= 4) {
    startPage = 2;
    endPage = 6;
  } else if (current >= pageCount - 3) {
    startPage = pageCount - 5;
    endPage = pageCount - 1;
  } else {
    startPage = current - 2;
    endPage = current + 2;
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <PaginationItem key={i}>
        <PaginationLink onClick={() => onChange(i)} isActive={i === current}>
          {i}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  return pages;
}
