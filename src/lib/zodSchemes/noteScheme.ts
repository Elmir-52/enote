import z from "zod";

export const NoteScheme = z.object({
    note_id: z.string(),
    user_id: z.string(),
    title: z.string(), 
    content: z.string(),
    date: z.string(),
    backgroundColor: z.string(),
})