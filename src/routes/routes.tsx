import { Route, Routes } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AllBooks from "../pages/AllBooks";
import SingleBook from "@/pages/SingleBook";
import CreateBook from "@/pages/CreateBook";
import BorrowedBooksSummary from "@/pages/BorrowedBooksSummary";
import BaseLayout from "@/layouts/BaseLayout";
import ErrorPage from "@/error-page";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="all-books" element={<AllBooks />} />
                <Route path="books/:id" element={<SingleBook />} />
                <Route path="add-book" element={<CreateBook />} />
                <Route path="borrow-summary" element={<BorrowedBooksSummary />} />
            </Route>
            <Route element={<BaseLayout />}>
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
