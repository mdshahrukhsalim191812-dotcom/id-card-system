import { NextResponse } from "next/server";

let students = [
    { name: "Aman Kumar", class: "10", roll: "12" },
    { name: "Riya Sharma", class: "9", roll: "5" },
];

// GET all students
export async function GET() {
    return NextResponse.json(students);
}

// POST new student
export async function POST(req: Request) {
    const body = await req.json();

    students.push(body);

    return NextResponse.json({ message: "Student added", body });
}