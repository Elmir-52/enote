import z from "zod";

export const UserScheme = z.object({
    name: z.string(),
    password: z.string()
})