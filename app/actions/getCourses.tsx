import { db } from "@/lib/db";
import { Course } from "@prisma/client";

const getCoursesByCategory = async (
  categoryId: string | null
): Promise<Course[]> => {
  const whereClause: any = {
    ...(categoryId ? { categoryId } : {}),
  };

  const course = await db.course.findMany({
    where: whereClause,
    include: {
      category: true,
      subCategory: true,
      level: true,
      sections: {
        where: {
          isPublished: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return course;
};

export default getCoursesByCategory;
