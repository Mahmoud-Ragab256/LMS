import type { ICourseRes } from "../../interfaces";
import Img from '../../assets/profile-1.jpg'
import { Fragment } from "react/jsx-runtime";
import { Link, useLocation } from "react-router";
import { useLanguage } from "../../context/useLanguage";
import capitalizeWord from "../../utils/capltalize";
import Button from "../ui/Button";
import { IoIosStats } from "react-icons/io";

interface IProps {
  courses: ICourseRes[];
  isLoading: boolean;
  error: Error | null;
}

function CourseContainer({ courses, isLoading, error }: IProps) {

  const { t } = useLanguage();
  const location = useLocation();

  const renderCourses = courses.map(course => {
    return (
      <Fragment key={course.id}>
        <div className="w-full rounded-xl overflow-hidden flex flex-col bg-surface-light border border-gray-300 dark:bg-surface-dark dark:border-gray-700 dark:text-gray-300 hover:-translate-y-1 transition duration-300 shadow-md shadow-black/5 dark:shadow-black/20">

          <Link to={`/courses/${course.id}`} className="relative h-40">
            <img src={course.imgUrl} alt="Physics" className="w-full h-full object-cover" />
            <span className="absolute top-2 inset-e-2 px-2 rounded-full text-xs font-light z-50 bg-primary/60 shadow shadow-black/20 text-white">
              {t(capitalizeWord(course.category))}
            </span>
          </Link>
          <div className="p-4">
            <h5 className="font-medium line-clamp-1">{course.title}</h5>
            <p className="text-xs mt-1 line-clamp-2">{course.description}</p>
          </div>

          {location.pathname === '/my-learning' ?
            <div className="p-2 flex items-center justify-between gap-1 text-sm">
              <Link to={`/courses/${course.id}`} className="w-full">
                <Button className="btn-sm w-full" >
                  {t("Manage Course")}
                </Button>
              </Link>
              <Button className="btn-outline btn-sm text-xl">
                <IoIosStats />
              </Button>
            </div>
            : <> <hr className="text-gray-100 dark:text-gray-700" />
              <div className="p-4 flex items-center justify-between gap-1 text-sm">

                <Link to={`/teachers/${course.teacherId}`} className="flex items-center gap-1">
                  <span className="block w-8 h-8 rounded-full overflow-hidden">
                    <img src={course.teacherImg ? course.teacherImg : Img} alt="teacher" className="w-full h-full object-cover" />
                  </span>
                  <h6 className="text-sm line-clamp-1">{course.teacherName}</h6>
                </Link>

                <span className="block">${course.price}</span>

              </div>
            </>}

        </div>
      </Fragment>
    )
  })

  //         <div className="p-4 flex items-center justify-between gap-1 text-sm">

  //           <Link to={`/teachers/${course.teacherId}`} className="flex items-center gap-1">
  //             <span className="block w-8 h-8 rounded-full overflow-hidden">
  //               <img src={course.teacherImg ? course.teacherImg : Img} alt="teacher" className="w-full h-full object-cover" />
  //             </span>
  //             <h6 className="text-sm line-clamp-1">{course.teacherName}</h6>
  //           </Link>

  //           <span className="block">${course.price}</span>

  //         </div>
  //       </div>
  //     </Fragment>
  //   )
  // })

  return (
    <>
      {isLoading ?
        <div className="w-full flex items-center justify-center py-20  rounded-lg">
          <div className="w-10 h-10 border-4 border-neutral-quaternary border-t-primary rounded-full animate-spin" />
        </div>
        : error ? <div className="w-full flex items-center justify-center py-20 rounded-lg">
          No Courses Found
        </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5 p-5">
          {renderCourses}
        </div>
      }
    </>

  )
}

export default CourseContainer;