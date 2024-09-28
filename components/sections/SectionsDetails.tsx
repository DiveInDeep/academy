"use client"

import {
  Course,
  MuxData,
  Progress,
  Purchase,
  Resource,
  Section,
} from "@prisma/client";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface SectionsDetailsProps {
  course: Course;
  section: Section;
  purchase: Purchase | null;
  muxData: MuxData | null;
  resources: Resource[] | [];
  progress: Progress | null;
}

const SectionsDetails = ({
  course,
  section,
  purchase,
  muxData,
  resources,
  progress,
}: SectionsDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const buyCourse = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/courses/${course.id}/checkout`);
      window.location.assign(response.data.url);
    } catch (err) {
      console.log("Failed to checkout course", err);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="px-6 py-4 flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold max-md:mb-4">{section.title}</h1>
        {!purchase ? (
          <Button onClick={buyCourse}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <p> Buy this course</p>
            )}
          </Button>
        ) : (
          <Button>Mark as Complete</Button>
        )}
      </div>
    </div>
  );
};

export default SectionsDetails;
