/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDeleteBookMutation, useGetBookQuery } from "@/redux/api/baseApi";
import { useNavigate } from "react-router";
import type { IBook } from "@/utils/types";
import { Card } from "@/components/ui/card";
import { Eye, Trash2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import Swal, { type SweetAlertResult } from "sweetalert2";
import { Bounce, toast } from "react-toastify";
import BorrowBook from "../BorrowBook";
import Pagination from "../ui/pagination";
import UpdateBook from "./UpdateBook";
import Wrapper from "./Wrapper";

const BooksTable = (props: { items: number }) => {
    const navigate = useNavigate();

    //Pagination
    const itemsPerPage = props.items || 6;
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isError } = useGetBookQuery(
        {
            filter: "",
            limit: itemsPerPage,
            skip: (currentPage - 1) * itemsPerPage,
        },
        {
            pollingInterval: 30000,
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
        }
    );

    useEffect(() => {
        if (data && data.totalBooks) {
            setTotalPages(Math.ceil(data.totalBooks / itemsPerPage));
        }
    }, [data, itemsPerPage]);

    const [deleteBook] = useDeleteBookMutation();

    const handleDelete = async (id: string) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result: SweetAlertResult) => {
                if (result.isConfirmed) {
                    const res = await deleteBook(id).unwrap();
                    toast.success(res.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        transition: Bounce,
                    });
                }
            });
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    if (isLoading) {
        return (
            <div className="px-4 md:px-8 mt-4">
                <div className="animate-pulse space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex space-x-4">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    if (isError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="p-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                        <XCircle className="h-16 w-16 text-red-900" />
                        <h2 className="text-2xl font-bold text-gray-900">Error Loading Books</h2>
                        <p className="text-gray-600">There was an error loading the book list. Please try again.</p>
                    </div>
                </Card>
            </div>
        );
    }
    return (
        <Wrapper>
            <div className="flex justify-between items-center py-6">
                <h2 className="text-xl font-semibold">Discover Your Next Book</h2>
                <Button onClick={() => navigate("/add-book")} variant="default">
                    Add a new book
                </Button>
            </div>
            <div className="hidden lg:block mb-2">
                <Table className="text-center">
                    <TableHeader className="bg-black [&>tr>th]:text-center [&>tr>th]:text-white">
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Genre</TableHead>
                            <TableHead>ISBN</TableHead>
                            <TableHead>Copies</TableHead>
                            <TableHead>Availability</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data &&
                            data.data &&
                            data.data.map((book: IBook) => {
                                return (
                                    <TableRow key={book._id}>
                                        <TableCell>
                                            <img src={book.imageUrl} accessKey={book.title} className="w-12 h-12 rounded-full" />
                                        </TableCell>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell>{book.author}</TableCell>
                                        <TableCell>{book.genre}</TableCell>
                                        <TableCell>
                                            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">{book.isbn}</code>
                                        </TableCell>
                                        <TableCell>{book.copies}</TableCell>
                                        <TableCell>{book.available ? "Available" : "Not Available"}</TableCell>
                                        <TableCell className="flex justify-center items-center gap-2">
                                            <Button onClick={() => navigate(`/books/${book._id}`)} variant="outline">
                                                <Eye />
                                            </Button>
                                            <UpdateBook id={book._id} />
                                            <div>
                                                <BorrowBook book={book._id} available={book.available} />
                                            </div>
                                            <Button onClick={() => handleDelete(book._id)} variant="destructive">
                                                <Trash2 />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </div>
            <div className="lg:hidden mb-3">
                <div className="flex flex-wrap justify-center gap-5 items-center">
                    {data.data.length === 0 ? (
                        <p className="text-center">No books available</p>
                    ) : (
                        data.data.map((book: IBook, index: number) => {
                            return (
                                <div key={index} className="border w-full sm:w-[325px] p-3 rounded-xl">
                                    <img src={book.imageUrl} accessKey={book.title} className="aspect-video rounded-t-xl mb-2" />
                                    <h3 className="font-bold">{book.title}</h3>
                                    <p>Author: {book.author}</p>
                                    <p>Genre: {book.genre}</p>
                                    <p>
                                        ISBN: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">{book.isbn}</code>
                                    </p>
                                    <p>Copies: {book.copies}</p>
                                    <p>Availability: {book.available ? "Available" : "Not Available"}</p>
                                    <div className="flex gap-2 mt-2">
                                        <Button onClick={() => navigate(`/books/${book._id}`)} variant="outline">
                                            <Eye />
                                        </Button>
                                        <UpdateBook id={book._id} />
                                        <BorrowBook book={book._id} available={book.available} />
                                        <Button onClick={() => handleDelete(book._id)} variant="destructive">
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            {/* Pagination */}
            <div className="mt-8">
                <Pagination totalPages={totalPages} currentPage={currentPage} onHandleCurrentPage={setCurrentPage} />
            </div>
        </Wrapper>
    );
};

export default BooksTable;
