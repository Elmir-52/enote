import { ref } from "firebase/database";
import { db } from "../firebase";
import { deleteItem } from "@/utils/firebaseRequestFunctions";

export default async function deleteNote(noteId: unknown) {
    try {
        
        if (typeof noteId === 'string' && noteId) {
            
            const noteRef = ref(db, `/notes/${noteId}`);
            await deleteItem(noteRef);
            return { message: 'Успех, заметка удалилась', status: 200 };

        } else {
            return { message: 'Данные не валидны', status: 400 };
        }

    } catch(e) {
        return { message: 'Что-то пошло не так', status: 500 };
    }
}