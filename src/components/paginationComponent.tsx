import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from '@/components/ui/pagination';
  
  type Props = {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages?: number;
  };
  
  function PaginationComponent({ currentPage, setCurrentPage, totalPages = 6 }: Props) {
    const generatePages = () => {
      const pages: (number | string)[] = [];
      const maxVisible = 3; 
  
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
  
        if (currentPage > maxVisible) {
          pages.push('...');
        }
  
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
  
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
  
        if (currentPage < totalPages - (maxVisible - 1)) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
      return pages;
    };
  
    const pages = generatePages();
  
    return (
      <Pagination>
        <PaginationContent className="flex items-center space-x-2">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className="px-3 py-1 rounded-full border border-gray-300 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </PaginationItem>
          {pages.map((page, idx) => (
            <PaginationItem key={idx}>
              {page === '...' ? (
                <PaginationEllipsis className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500" />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page as number);
                  }}
                  isActive={page === currentPage}
                  className={`w-8 h-8 flex items-center justify-center rounded-full border 
                    ${page === currentPage
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
  
          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className="px-3 py-1 rounded-full border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
  
  export default PaginationComponent;
  