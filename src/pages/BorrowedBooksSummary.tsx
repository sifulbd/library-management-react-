import { Card } from "@/components/ui/card";
import { useGetBorrowedBooksSummaryQuery } from "@/redux/api/baseApi";
import { BarChart3 } from "lucide-react";
import type { BorrowedBookSummary } from "@/utils/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import Wrapper from "@/components/common/Wrapper";

export default function BorrowedBooksSummary() {
    const { data, isLoading, error } = useGetBorrowedBooksSummaryQuery(undefined, {
        pollingInterval: 30000,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });

    const navigate = useNavigate();

    const borrowedBooks: BorrowedBookSummary[] = data?.data || [];

    if (isLoading) {
        return (
            <div className="px-4 md:px-8 mt-4">
                <div className="space-y-6">
                    <div className="animate-pulse">
                        <div className="h-8 bg-secondary rounded w-64 mb-2"></div>
                        <div className="h-4 bg-secondary rounded w-48"></div>
                    </div>
                    <div className="animate-pulse">
                        <div className="bg-secondary h-64 rounded-lg"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-4 md:px-8 mt-4">
                <Card className="p-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                        <BarChart3 className="h-16 w-16 text-destructive" />
                        <h2 className="text-2xl font-bold">Error Loading Summary</h2>
                        <p className="text-muted-foreground">There was an error loading the borrowed books summary. Please try again.</p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <>
            <div className="text-center h-[10vh]">
                <h2 className="text-4xl mt-32">Ola, Welcome </h2>
                <p>Your Borrowed Collection</p>
            </div>
            <Wrapper>
                <div className="hidden md:block mb-2">
                    <Table className="text-center">
                        <TableHeader className="bg-black [&>tr>th]:text-center [&>tr>th]:text-white">
                            <TableRow>
                                <TableHead>Book title</TableHead>
                                <TableHead>ISBN</TableHead>
                                <TableHead>Total Quantity Borrowed</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...borrowedBooks]
                                .sort((a, b) => b.totalQuantity - a.totalQuantity)
                                .map((borrowedBook: BorrowedBookSummary) => {
                                    return (
                                        <TableRow key={borrowedBook.book._id}>
                                            <TableCell>{borrowedBook.book.title}</TableCell>
                                            <TableCell>
                                                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">{borrowedBook.book.isbn}</code>
                                            </TableCell>
                                            <TableCell>{borrowedBook.totalQuantity}</TableCell>
                                            <TableCell className="flex justify-center gap-2">
                                                <Button onClick={() => navigate(`/books/${borrowedBook.book._id}`)} variant="outline">
                                                    View book
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>
                <div className="md:hidden mb-3">
                    <div className="flex flex-wrap justify-center gap-2 items-center">
                        {[...borrowedBooks].length === 0 ? (
                            <p className="text-center">No borrowed books available</p>
                        ) : (
                            [...borrowedBooks]
                                .sort((a, b) => b.totalQuantity - a.totalQuantity)
                                .map((borrowedBook: BorrowedBookSummary) => {
                                    return (
                                        <div key={borrowedBook.book._id} className="border w-full sm:w-[325px] p-3 rounded-xl">
                                            <h3 className="font-bold">{borrowedBook.book.title}</h3>
                                            <p>
                                                ISBN: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">{borrowedBook.book.isbn}</code>
                                            </p>
                                            <p>Total Quantity Borrowed: {borrowedBook.totalQuantity}</p>
                                            <div className="flex gap-2 mt-2">
                                                <Button onClick={() => navigate(`/books/${borrowedBook.book._id}`)} variant="outline">
                                                    View book
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })
                        )}
                    </div>
                </div>
            </Wrapper>
        </>
    );
}
