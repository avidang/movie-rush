import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDisabled?: boolean;
  className?: string;
}

const MAX_VISIBLE_PAGES = 5;

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isDisabled = false,
  className,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const visiblePages = getVisiblePages(safeCurrentPage, totalPages);

  return (
    <div
      className={className ?? 'flex items-center justify-center gap-2'}
      aria-label="Pagination"
      role="navigation"
    >
      <Button
        size="icon"
        color="secondary"
        aria-label="First page"
        disabled={isDisabled || safeCurrentPage <= 1}
        onClick={() => onPageChange(1)}
      >
        <ChevronsLeft className="h-4 w-4" aria-hidden="true" />
      </Button>

      <Button
        size="icon"
        color="secondary"
        aria-label="Previous page"
        disabled={isDisabled || safeCurrentPage <= 1}
        onClick={() => onPageChange(safeCurrentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </Button>

      {visiblePages.map((page) => (
        <Button
          key={page}
          size="icon"
          color={page === safeCurrentPage ? 'primary' : 'secondary'}
          aria-current={page === safeCurrentPage ? 'page' : undefined}
          aria-label={`Go to page ${page}`}
          disabled={isDisabled}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        size="icon"
        color="secondary"
        aria-label="Next page"
        disabled={isDisabled || safeCurrentPage >= totalPages}
        onClick={() => onPageChange(safeCurrentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>

      <Button
        size="icon"
        color="secondary"
        aria-label="Last page"
        disabled={isDisabled || safeCurrentPage >= totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        <ChevronsRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
};

const getVisiblePages = (currentPage: number, totalPages: number) => {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const half = Math.floor(MAX_VISIBLE_PAGES / 2);
  let start = currentPage - half;
  let end = currentPage + half;

  if (start < 1) {
    start = 1;
    end = MAX_VISIBLE_PAGES;
  }

  if (end > totalPages) {
    end = totalPages;
    start = totalPages - MAX_VISIBLE_PAGES + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};
