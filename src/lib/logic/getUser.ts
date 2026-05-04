import { getOneItem } from "@/utils/firebaseRequestFunctions";
import { ref } from "firebase/database";
import { db } from "../firebase";
import { User } from "@/shared/types/user";

export default async function getUser(userId: string) {
    const userRef = ref(db, `/users/${userId}`);
    const user = await getOneItem<User>(userRef);
    return user;
}