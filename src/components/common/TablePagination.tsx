import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPageItems } from "@/utils/format";
type Props = {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function TablePagination({
  page,
  totalPages,
  total,
  onPageChange,
}: Props) {
  if (total === 0) return null;

  const disabled = {
    cursor: "default",
    opacity: 0.5,
  };

  return (
    <div className="flex items-center justify-end pt-4">
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              style={page <= 1 ? disabled : {}}
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>

          {getPageItems(page, totalPages).map((item, index) => (
            <PaginationItem key={`${item}-${index}`}>
              {item === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={item === page}
                  onClick={() => onPageChange(item)}
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              style={page >= totalPages ? disabled : {}}
              onClick={() => onPageChange(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
