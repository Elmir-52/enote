import getUser from "@/lib/logic/getUser";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const headerList = await headers();
    const userId = headerList.get('authorization');

    if (userId) {
        const userData = await getUser(userId);
        return NextResponse.json(userData, { status: 200 });
    } else {
        return NextResponse.json('Отсутствует Authorization Header', { status: 401 });
    }
}