import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: { courseId: string } }) => {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) { return new Response("Unauthorized", { status: 401 }) }

    const values = await req.json();
    const course = await db.course.update({
      where: { id: courseId, instructorId: userId },
      data: { ...values }
    })

    return NextResponse.json(course, { status: 200 })

  } catch (err) {
    console.error(["courseId_PATCH", err])
    return new Response("Internal Server Error", { status: 500 })
  }
}