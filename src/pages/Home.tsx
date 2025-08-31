import { Banner } from "@/components/common/Banner";
import BooksTable from "@/components/common/BooksTable";

const Home = () => {
    return (
        <>
            <Banner />
            <BooksTable items={6} />
        </>
    );
};

export default Home;
