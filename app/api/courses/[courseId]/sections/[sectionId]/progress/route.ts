import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { courseId: string; sectionId: string } }
) => {
  try {
    const { userId } = auth();
    const { isCompleted } = await req.json();
    const { courseId, sectionId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        instructorId: userId,
      },
    });

    if (!course) {
      return new NextResponse("Course Not Found", { status: 404 });
    }

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
        courseId,
      },
    });

    if (!section) {
      return new NextResponse("Section Not Found", { status: 404 });
    }

    const progress = await db.progress.upsert({
      where: {
        studentId_sectionId: {
          studentId: userId,
          sectionId,
        },
      },
      update: {
        isCompleted,
      },
      create: {
        studentId: userId,
        sectionId,
        isCompleted,
      },
    });

    return NextResponse.json(progress, { status: 200 });
  } catch (err) {
    console.log("[sectionId_progress_POST", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
