import authorizationUser from "@/lib/logic/authorizationUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user: unknown = await req.json();

    const answer = await authorizationUser(user);
    
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