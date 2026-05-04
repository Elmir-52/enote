import createNote from "@/lib/logic/createNote";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const note: unknown = await req.json();

    const answer = await createNote(note);

    return NextResponse.json(answer.message, {
        status: answer.status,
    });
}