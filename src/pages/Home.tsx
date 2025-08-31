import { Banner } from "@/components/common/Banner";
import BooksTable from "@/components/common/BooksTable";

const Home = () => {
    return (
        <>
            <Banner
                className=""
                title="Your Library, Simplified"
                description="Effortlessly browse, manage, and borrow books with a clean,
          user-friendly interface — no logins, no clutter, just reading made
          easy."
            />
            <BooksTable items={6} />
        </>
    );
};

export default Home;
