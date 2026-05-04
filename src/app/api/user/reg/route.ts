import registrationUser from "@/lib/logic/registrationUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user: unknown = await req.json();

    const answer = await registrationUser(user);

    if (answer) {
        return NextResponse.json(
            answer.message, 
            {
                status: answer.status,
            }
        );
    } else {
        return NextResponse.json(
            'Что-то пошло не так', 
            {
                status: 500,
            }
        );
    }
}