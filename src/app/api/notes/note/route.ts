import createNote from "@/lib/logic/createNote";
import deleteNote from "@/lib/logic/deleteNote";
import editNote from "@/lib/logic/editNote";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const note: unknown = await req.json();

    const answer = await createNote(note);

    return NextResponse.json(answer.message, {
        status: answer.status,
    });
}

export async function PUT(req: Request) {
    const note: unknown = await req.json();

    const answer = await editNote(note);
    
    return NextResponse.json(answer.message, {
        status: answer.status,
    });
}
