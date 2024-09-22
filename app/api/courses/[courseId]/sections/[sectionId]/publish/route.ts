import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { courseId: string; sectionId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    const { courseId, sectionId } = params;

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

    const muxData = await db.muxData.findUnique({
      where: { id: sectionId }
    })

    if (!muxData) {
      return new NextResponse("Mux Data Not Found", { status: 404 })
    }

    if (!section || !muxData || !section.title || !section.description || !section.videoUrl) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const publishSection = await db.section.update({
      where: {
        id: sectionId,
        courseId
      },
      data: {
        isPublished: true
      }
    })

    return NextResponse.json(publishSection, { status: 200 })
  } catch (err) {
    console.log(`[section_publish_POST]`, err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
