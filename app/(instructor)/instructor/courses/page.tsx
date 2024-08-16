import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("sign-in");
  }

  const courses = await db.course.findMany({
    where: {
      instructorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(courses, "this is the course page's courses::::")

  return (
    <div className="px-6 py-4">
      <Link href="/instructor/create-course">
        <Button>Create New Course</Button>
      </Link>
      <div className="mt-10">
        {courses.map((course) => {
          console.log(course, "this is the course page's courses::::")
          return (
            <Link href={`/instructor/courses/${course.id}/basic`}>
              {course.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CoursesPage;
