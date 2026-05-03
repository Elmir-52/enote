import { equalTo, orderByChild, query, ref } from "firebase/database";
import { db } from "../firebase";
import { getArrayItems } from "@/utils/firebaseRequestFunctions";
import { User } from "@/shared/types/user";
import { UserScheme } from "../zodSchemes/userScheme";


export default async function authorization(user: unknown) {
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

        if (response && response[0]) {
            const userFromDb = response[0];

            if (userFromClient.password === userFromDb.password) {
                return {message: userFromDb.user_id, status: 200};
            } else {
                return {message: 'Неправильный логин или пароль', status: 400};
            }
        } else {
            return {message: 'Неправильный логин или пароль', status: 400};
        }

    } else {
        return {message: 'Что-то пошло не так', status: 400};
    }
}