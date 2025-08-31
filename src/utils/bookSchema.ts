import { z } from "zod";

export const genreEnum = z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]);

export const bookSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    author: z.string().min(1, { message: "Author is required" }),
    genre: genreEnum,
    isbn: z.string().trim().min(8, { message: "ISBN must be at least 8 digits" }).max(12, { message: "ISBN must be at most 12 digits" }).regex(/^\d+$/, { message: "ISBN must contain only digits" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters" }),
    copies: z.number().min(1, { message: "Copies must be at least 1" }),
    imageUrl: z.string().url(),
});
