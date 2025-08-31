import { Button } from "./button";

const Pagination = (props: { totalPages: number; currentPage: number; onHandleCurrentPage: (page: number) => void }) => {
    const { totalPages, currentPage, onHandleCurrentPage } = props;
    const handleFirstPage = () => {
        onHandleCurrentPage(1);
    };
    const handleLastPage = () => {
        onHandleCurrentPage(totalPages);
    };
    const handlePreviousChange = () => {
        if (currentPage > 1) {
            onHandleCurrentPage(currentPage - 1);
        }
    };
    const handleNextChange = () => {
        if (currentPage < totalPages) {
            onHandleCurrentPage(currentPage + 1);
        }
    };

    const getVisiblePageNumbers = () => {
        const visiblePages = 3;
        const pages = [];

        let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        const endPage = Math.min(totalPages, startPage + visiblePages - 1);

        if (endPage - startPage < visiblePages - 1) {
            startPage = Math.max(1, endPage - visiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const visiblePageNumbers = getVisiblePageNumbers();

    return (
        <div className="flex justify-center items-center gap-2">
            <Button variant="outline" onClick={handleFirstPage} disabled={currentPage === 1} aria-label="First Page">
                &laquo;&laquo;
            </Button>
            <Button variant="outline" onClick={handlePreviousChange} disabled={currentPage === 1} aria-label="Previos page">
                &laquo;
            </Button>
            {visiblePageNumbers.map((pageNumber) => {
                return (
                    <Button key={pageNumber} onClick={() => onHandleCurrentPage(pageNumber)} variant={currentPage === pageNumber ? "default" : "secondary"}>
                        {pageNumber}
                    </Button>
                );
            })}
            <Button variant="outline" onClick={handleNextChange} disabled={currentPage === totalPages} aria-label="Next Page">
                &raquo;
            </Button>
            <Button variant="outline" onClick={handleLastPage} disabled={currentPage === totalPages} aria-label="Last Page">
                &raquo; &raquo;
            </Button>
        </div>
    );
};

export default Pagination;
