import EditCourseForm from "@/components/courses/EditCourseForm";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const CourseBasic = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in")
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      instructorId: userId
    },

  })

  if (!course) {
    return redirect("/instructor/courses")
  }

  return (
    <div className="px-10">
      <EditCourseForm course={course} />
    </div>
  );
};

export default CourseBasic;
