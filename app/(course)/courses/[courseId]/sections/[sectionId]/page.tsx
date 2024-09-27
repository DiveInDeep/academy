import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SectionDetailsPage = async ({
  params,
}: {
  params: {
    courseId: string;
    sectionId: string;
  };
}) => {
  const { courseId, sectionId } = params;
  const { userId } = auth();

  if (!userId) return redirect("/sign-in");
  const course = db.course.findUnique({
    where: { id: courseId, isPublished: true },
    include: {
      sections: {
        where: { isPublished: true },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const section = await db.section.findUnique({
    where: { id: sectionId, courseId, isPublished: true },
  });

  if (!section) {
    return redirect(`/courses/${courseId}/overview`);
  }

  return (
    <div className="px-6 py-4 flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold max-md:mb-4">{section.title}</h1>
      </div>
    </div>
  );
};

export default SectionDetailsPage;
