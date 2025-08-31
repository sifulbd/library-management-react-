import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetBookByIdQuery } from "@/redux/api/baseApi";
import { useNavigate, useParams } from "react-router";
import { Users, Hash, CheckCircle, XCircle, ArrowLeftCircle } from "lucide-react";
import type { IBook } from "@/utils/types";
import Wrapper from "@/components/common/Wrapper";

export default function SingleBook() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading, error } = useGetBookByIdQuery(id, {
        pollingInterval: 30000,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });

    const goBack = () => {
        navigate(-1);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gray-200 aspect-[3/4] rounded-lg"></div>
                        <div className="space-y-4">
                            <div className="h-8 bg-gray-200 rounded"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !data?.data) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Card className="p-8 text-center">
                    <div className="flex flex-col items-center space-y-4">
                        <XCircle className="h-16 w-16 text-destructive" />
                        <h2 className="text-2xl font-bold">Book Not Found</h2>
                        <p className="text-muted-foreground">The book you're looking for doesn't exist or has been removed.</p>
                    </div>
                </Card>
            </div>
        );
    }

    const book: IBook = data.data;

    return (
        <Wrapper>
            <div onClick={goBack} className="text-black cursor-pointer pb-4">
                <ArrowLeftCircle className="w-8 h-8" />
            </div>
            <div className="flex flex-col text-left  p-8 justify-center items-start gap-4 md:gap-8">
                {/* Book Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-2 mt-8">{book.title}</h1>
                        <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="secondary" className="text-sm">
                                {book.genre}
                            </Badge>
                            <Badge variant={book.available ? "default" : "destructive"} className="text-sm">
                                {book.available ? (
                                    <>
                                        <CheckCircle className="w-3 h-3 mr-1" /> Available
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="w-3 h-3 mr-1" /> Unavailable
                                    </>
                                )}
                            </Badge>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Hash className="h-5 w-5" />
                            <div>
                                <p className="text-sm font-medium">ISBN</p>
                                <p className="text-gray-900 dark:text-gray-100">{book.isbn}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Users className="h-5 w-5" />
                            <div>
                                <p className="text-sm font-medium">Available Copies</p>
                                <p className="font-semibold">
                                    {book.copies} {book.copies === 1 ? "copy" : "copies"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {book.description && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Description</h3>
                                <p className="leading-relaxed">{book.description}</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Book Image */}
                <img src={book.imageUrl || "https://i.ibb.co.com/1fLCTzCV/4735.jpg"} alt={book.title} className="aspect-auto object-contain rounded-lg" />
            </div>
        </Wrapper>
    );
}
