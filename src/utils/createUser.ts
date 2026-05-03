import { User } from "@/shared/types/user";

export default function createUser(name: string, password: string): User {
    const arrayOfNumbersForNewUserId: BigUint64Array<ArrayBuffer> = crypto.getRandomValues(new BigUint64Array(2));
    const newUserId: string = `${arrayOfNumbersForNewUserId[0].toString(36).padStart(13, '0')}-${arrayOfNumbersForNewUserId[1].toString(36).padStart(13, '0')}`;

    const newUser: User = {
        user_id: newUserId,
        name,
        password,
    }

    return newUser;
}