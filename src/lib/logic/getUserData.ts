import { getOneItem } from "@/utils/firebaseRequestFunctions";
import { ref } from "firebase/database";
import { db } from "../firebase";

export default async function getUserData(userId: string) {
    const userRef = ref(db, `/users/${userId}`);
    const user = await getOneItem(userRef);
    return user;
}