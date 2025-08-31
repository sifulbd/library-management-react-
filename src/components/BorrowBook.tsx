/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import { borrowSchema } from "@/utils/borrowSchema";
import type { ApiError } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import type z from "zod";

export default function BorrowBook(props: { available?: boolean; book: string }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof borrowSchema>>({
        resolver: zodResolver(borrowSchema),
        defaultValues: {
            quantity: 0,
            dueDate: new Date(),
        },
    });

    const [borrowBook, { isError, error }] = useBorrowBookMutation();

    if (isError) {
        const getErrorMessage = (error: unknown): string => {
            if (error && typeof error === "object" && "data" in error) {
                const apiError = error as ApiError;
                return apiError.data?.message || "Something went wrong";
            }
            return "Something went wrong. Please try again.";
        };
        toast.error(getErrorMessage(error));
    }

    const onSubmit = async (data: z.infer<typeof borrowSchema>) => {
        const borrowData = {
            ...data,
            dueDate: data.dueDate.toISOString().split("T")[0],
            book: props.book,
        };

        try {
            const res = await borrowBook(borrowData).unwrap();
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
            form.reset();
            setOpen(false);
            navigate("/borrow-summary");
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button disabled={!props.available} variant="outline">
                        Borrow
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogTitle>Borrow this Book</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Quantity" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Due Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant="outline" className={cn("text-left font-normal", !field.value && "text-muted-foreground")}>
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} captionLayout="dropdown" />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">
                                Borrow
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
