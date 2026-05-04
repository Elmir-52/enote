import { ref } from "firebase/database";
import { NoteScheme } from "../zodSchemes/noteScheme";
import { db } from "../firebase";
import { putItem } from "@/utils/firebaseRequestFunctions";

export default async function editNote(note: unknown) {
    const result = NoteScheme.safeParse(note);
    
    if (result.success) {
        const note = result.data;
        try {
            if (note.note_id && note.user_id) {
                const noteRef = ref(db, `/notes/${note.note_id}`);
                await putItem(noteRef, { title: note.title, content: note.content });
                return { message: 'Успех', status: 200 };
            } else {
                return { message: 'Данные не валидны', status: 400 };
            }
        } catch(e) {
            return { message: 'Что-то пошло не так', status: 500 };
        }
    } else {
        return { message: 'Данные не валидны', status: 400 };
    }
}