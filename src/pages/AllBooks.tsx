import { Banner } from "@/components/common/Banner";
import BooksTable from "@/components/common/BooksTable";

const AllBooks = () => {
    return (
        <div>
            <Banner className="h-[60vh]" title="Explore Our Collection" description="Browse every book in the library — view details, edit, borrow, or manage copies, all in one convenient place." />
            <BooksTable items={12} />
        </div>
    );
};

export default AllBooks;
