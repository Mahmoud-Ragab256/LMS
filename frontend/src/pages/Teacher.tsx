import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import API from "../config/axiosConfig";
import type { ICourseRes, ITeacherRes } from "../interfaces";
import TopBar from "../components/profile/TopBar";
import About from "../components/profile/About";
import CourseContainer from "../components/containers/CourseContainer";

function Teacher() {

  const { id } = useParams<{ id: string }>();

  const { data: teacher, isLoading, error } = useQuery<ITeacherRes>({
    queryKey: ['teacher'],
    queryFn: async () => {
      const response = await API.get(`/teachers/${id}`);
      return response.data.data;
    },
    retry: false,
  })

  const { data: courses, isLoading: isCoursesLoading, error: coursesError } = useQuery<ICourseRes[]>({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await API.get(`/courses/teacher/${id}`);
      return response.data.data;
    },
    retry: false,
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!teacher) {
    return <div>Teacher not found</div>;
  }


  return (
    <>
      <TopBar teacher={teacher} />
      <About teacher={teacher} />
      <div className="m-5">
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm shadow-black/5">
          <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-200 p-5 text-center">Courses</h2>
          <CourseContainer courses={courses || []} isLoading={isCoursesLoading} error={coursesError} />
        </div>
      </div>
    </>
  )
}

export default Teacher