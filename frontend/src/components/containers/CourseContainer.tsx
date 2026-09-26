import type { ICourseRes } from "../../interfaces";
import Img from '../../assets/profile-1.jpg'
import { Fragment } from "react/jsx-runtime";

interface IProps {
  courses: ICourseRes[];
  isLoading: boolean;
  error: Error | null;
}

function CourseContainer({ courses, isLoading, error }: IProps) {


  const renderCourses = courses.map(course => {
    return (
      <Fragment key={course.id}>
        <div className="w-full rounded-xl overflow-hidden flex flex-col bg-surface-light border border-gray-300 dark:bg-surface-dark dark:border-gray-700 hover:-translate-y-1 transition duration-300 shadow-md shadow-black/5 dark:shadow-white/5">
          <a href={`/courses/${course.id}`} className="h-60"><img src={course.imgUrl} alt="Physics" className="w-full h-full" /></a>
          <div className="p-4">
            <h5 className="text-lg font-medium line-clamp-1">{course.title}</h5>
            <p className="text-sm line-clamp-2">{course.description}</p>
          </div>
          <hr className="text-gray-100 dark:text-gray-700" />
          <div className="p-4 flex items-center justify-between text-md">
            <span className="block">${course.price}</span>
            <div className="flex items-center gap-2">
              <h6>{course.teacherName}</h6>
              <span className="block w-10 h-10 rounded-full overflow-hidden">
                <img src={course.teacherImg ? course.teacherImg : Img} alt="teacher" className="w-full h-full object-cover" />
              </span>
            </div>

          </div>
        </div>
      </Fragment>
    )
  })

  return (
    <>
      {isLoading ?
        <div className="w-full flex items-center justify-center py-20  rounded-lg">
          <div className="w-10 h-10 border-4 border-neutral-quaternary border-t-primary rounded-full animate-spin" />
        </div>
        : error ? <div className="w-full flex items-center justify-center py-20  rounded-lg">
          No Courses Found
        </div> : <div className="mx-auto container grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 gap-5 p-5">
          {renderCourses}
        </div>
      }
    </>

  )
}

export default CourseContainer;