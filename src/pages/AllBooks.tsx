import { Banner } from "@/components/common/Banner";
import BooksTable from "@/components/common/BooksTable";

const AllBooks = () => {
    return (
        <div>
            <div className="text-center">
                <h2 className="text-4xl mt-32">Ola, Welcome </h2>
                <p>All Book are here</p>
            </div>
            <BooksTable items={12} />
        </div>
    );
};

export default AllBooks;
