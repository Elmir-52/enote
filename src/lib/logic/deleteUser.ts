import { equalTo, orderByChild, query, Query, ref, update } from "firebase/database";
import { db } from "../firebase";
import { deleteItem, getArrayItems } from "@/utils/firebaseRequestFunctions";
import { Note } from "@/shared/types/note";

export default async function deleteUser(userId: string) {
    try {
        const userRef = ref(db, `/users/${userId}`);

        const notesRef = ref(db, '/notes');
        const userNotesQuery: Query = query(
            notesRef,
            orderByChild('user_id'),
            equalTo(userId)
        );

        const userNotes = await getArrayItems<Note>(userNotesQuery);
        const updates: Record<string, null> = {};
        
        if (userNotes) {
            for (const note of userNotes) {
                updates[note.note_id] = null;
            }
        }

        await update(notesRef, updates);
        await deleteItem(userRef);

        return { messange: 'Успех', status: 200};
    } catch(e) {
        return { messange: 'Что-то пошло не так', status: 500};
    }
}