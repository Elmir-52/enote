import deleteUser from "@/lib/logic/deleteUser";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    const headerList = await headers();
    const userId = headerList.get('authorization');
    
    if (userId) {
        const answer = await deleteUser(userId);
        return NextResponse.json(answer.messange, { status: answer.status });
    } else {
        return NextResponse.json('Отсутствует Authorization Header', { status: 401 });
    }
}