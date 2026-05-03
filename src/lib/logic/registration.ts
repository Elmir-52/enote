import { equalTo, orderByChild, query, ref } from "firebase/database";
import { UserScheme } from "../zodSchemes/userScheme";
import { db } from "../firebase";
import { getArrayItems, setItem } from "@/utils/firebaseRequestFunctions";
import { User } from "@/shared/types/user";
import createUser from "@/utils/createUser";

export default async function registration(user: unknown) {
    const result = UserScheme.safeParse(user);

    if (result.success) {
        const userFromClient = result.data;

        if (!userFromClient.name.length || !userFromClient.password.length) {
            return {message: 'Не все данные введены', status: 400};
        }
        
        const usersDbRef = ref(db, '/users');
        const userQuery = query(
            usersDbRef,
            orderByChild('name'),
            equalTo(userFromClient.name)
        );
        
        const response = await getArrayItems<User>(userQuery);

        if (response && !response[0]) {
            const name = userFromClient.name;
            const password = userFromClient.password;
            const newUser = createUser(name, password);

            const userDbRef = ref(db, `/users/${newUser.user_id}`);
            const res = await setItem(userDbRef, newUser);

            if (res.ok) {
                return {message: newUser.user_id, status: 200};
            } else {
                return {message: 'Что-то пошло не так', status: 500};
            }
        } else {
            return {message: 'Имя уже занято', status: 400};
        }
    } else {
        return {message: 'Что-то пошло не так', status: 400};
    }
}