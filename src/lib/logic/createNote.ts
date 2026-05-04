import { setItem } from "@/utils/firebaseRequestFunctions";
import { NoteScheme } from "../zodSchemes/noteScheme";
import { ref } from "firebase/database";
import { db } from "../firebase";
import { Note } from "@/shared/types/note";

export default async function createNote(note: unknown) {
    const result = NoteScheme.safeParse(note);

    if (result.success) {
        const note = result.data;
        try {
            if (note.note_id && note.user_id) {
                const noteRef = ref(db, `/notes/${note.note_id}`);
                await setItem<Note>(noteRef, note);
                return { message: 'Успех, заметка создалась', status: 200 };
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