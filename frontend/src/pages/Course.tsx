import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router"
import API from "../config/axiosConfig";
import type { ICourseRes } from "../interfaces";
import { FaCirclePlay } from "react-icons/fa6";
import { useLanguage } from "../context/useLanguage";
import { BsFire } from "react-icons/bs";
import Button from "../components/ui/Button";
import Img from '../assets/profile/icon-7797704_1280.png';
import { MdVerified } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { IoInfiniteOutline } from "react-icons/io5";
import { BiSolidVideos } from "react-icons/bi";
import { MdQuiz } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoPlayCircleOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { PiExam } from "react-icons/pi";
import capitalizeWord from "../utils/capltalize";
import type { CourseContentType } from "../types";

interface IProps {

}

function Course({ }: IProps) {

  let duration: number = 0;
  let videoCount: number = 0;
  let quizCount: number = 0;
  let examCount: number = 0;

  const { id } = useParams<{ id: string }>();

  const { t } = useLanguage();


  const { isPending, data: course, error } = useQuery<ICourseRes>({
    queryKey: ['course'],
    queryFn: async () => {
      const response = await API.get(`/courses/${id}`);
      return response.data.data;
    },
    retry: false
  })

  const { isPending: contentPending, data: content, error: contentError } = useQuery<CourseContentType>({
    queryKey: ['content'],
    queryFn: async () => {
      const response = await API.get(`/courses/${id}/content`);
      return response.data.data;
    },
    retry: false
  })


  const renderContent = content?.map((c, index) => {

    c.type === 'video' ? duration += c.duration : null;
    c.type === 'video' ? videoCount += 1 : null;
    c.type === 'quiz' ? quizCount += 1 : null;
    c.type === 'exam' ? examCount += 1 : null;

    return (
      c.type === 'video' ?
        <div key={index} className="p-5 py-3 flex items-center justify-between">
          <Link to={`courses/${id}/video/:video_id`} className="flex items-center gap-2">
            <span>
              <IoPlayCircleOutline className="text-2xl text-primary" />
            </span>
            <p>{c.title}</p>
          </Link>

          <Link to={`courses/${id}/video/:video_id`} className="text-primary hover:underline hover:scale-105 transition duration-300">
            {t("Watch Video")}
          </Link>
        </div> :


        c.type === 'quiz' ? <div key={index} className="p-5 py-3 flex items-center justify-between">
          <Link to={`courses/${id}/quiz/:quiz_id`} className="flex items-center gap-2">
            <span>
              <GoQuestion className="text-2xl text-primary" />
            </span>
            <p>{c.title}</p>
          </Link>

          <Link to={`courses/${id}/quiz/:quiz_id`} className="text-primary hover:underline hover:scale-105 transition duration-300">
            {t("Take Quiz")}
          </Link>
        </div> :


          <div key={index} className="p-5 py-3 flex items-center justify-between">
            <Link to={`courses/${id}/exam/:exam_id`} className="flex items-center gap-2">
              <span>
                <PiExam className="text-2xl text-primary" />
              </span>
              <p>{c.title}</p>
            </Link>

            <Link to={`courses/${id}/exam/:exam_id`} className="text-primary hover:underline hover:scale-105 transition duration-300">
              {t("Take Exam")}
            </Link>
          </div>

    )
  })

  const totalHours = Math.floor(duration / 3600);
  const totalMinutes = Math.floor((duration % 3600) / 60);


  return (
    isPending ? <div> pending </div> : error ? <div>Error</div> :
      <>
        <div className="mt-20 flex flex-col bg-surface-light dark:bg-surface-dark dark:text-gray-200">
          <div className="relative w-full h-100">
            <img src={course.imgUrl} alt="Course Image" className="w-full h-full object-cover" />
            <span className="absolute top-0 left-0 w-full h-full bg-gray-800/10 hover:bg-gray-800/30 transition duration-500 z-50 flex items-center justify-center">
              <span className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <FaCirclePlay className="absolute text-primary text-6xl hover:scale-110 transition duration-500 cursor-pointer" />
              </span>
            </span>
          </div>
          <div className="p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-0.5 px-2 rounded-full bg-secondary/10 text-secondary text-sm flex items-center gap-1"><BsFire />{t("الاكثر طلبا")}</span>
              <span className="p-0.5 px-2 rounded-full bg-gray-800/10 text-gray-800 dark:bg-gray-300/10 dark:text-gray-300 text-sm">{t(capitalizeWord(course.level))}</span>
              <span className="p-0.5 px-2 rounded-full bg-primary/10 text-primary text-sm">{t(capitalizeWord(course.category))}</span>
            </div>
            <h2 className="font-medium">{course.title}</h2>
            <p className="text-sm">{course.description}</p>
          </div>
        </div>

        <div className="my-2 p-5 bg-surface-light dark:bg-surface-dark dark:text-gray-200 flex items-center justify-between">
          <Link to={`/teachers/${course.teacherId}`}>
            <Button className="btn-outline btn-sm">{t("View Profile")}</Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-start gap-2">
              <h4>{course.teacherName}</h4>
            </div>
            <span className="relative w-10 h-10 ">
              <img src={course.teacherImg ? course.teacherImg : Img} alt="Teacher Image" className="w-full h-full rounded-full overflow-hidden object-cover" />
              <span className="relative w-2 h-2 bottom-2.5 inset-s-0.5 rounded-full bg-white flex items-center justify-center">
                <MdVerified className="absolute text-blue-600 text-sm" />
              </span>
            </span>
          </div>
        </div>

        <div className="my-2 px-2 w-full grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="p-2 w-full flex flex-col sm:flex-row items-center gap-2 bg-surface-light dark:bg-surface-dark dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow shadow-white/5 rounded-lg">
            <span className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <MdOutlineAccessTime className="sm:text-2xl text-primary" />
            </span>

            <div className="text-xs sm:text-sm flex flex-col gap-1">
              <span className="hidden sm:block text-gray-500 dark:text-gray-400">{t("Duration")}</span>
              <p>{`${totalHours} ${t("Hours")} ${totalMinutes} ${t("Minutes")}`}</p>
            </div>
          </div>
          <div className="p-2 w-full flex flex-col sm:flex-row items-center gap-2 bg-surface-light dark:bg-surface-dark dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow shadow-white/5 rounded-lg">
            <span className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <BiSolidVideos className="sm:text-2xl text-secondary" />
            </span>

            <div className="text-xs sm:text-sm flex flex-col gap-1">
              <span className="hidden sm:block text-gray-500 dark:text-gray-400">{t("Academic Content")}</span>
              <p>{videoCount} {t("interactive lesson")}</p>
            </div>
          </div>
          <div className="p-2 w-full flex flex-col sm:flex-row items-center gap-2 bg-surface-light dark:bg-surface-dark dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow shadow-white/5 rounded-lg">
            <span className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600/10 rounded-lg flex items-center justify-center">
              <MdQuiz className="sm:text-2xl text-green-600" />
            </span>

            <div className="text-xs sm:text-sm flex flex-col gap-1">
              <span className="hidden sm:block text-gray-500 dark:text-gray-400">{t("Quizzes & Exams")}</span>
              <p>{quizCount + examCount} {t("Quiz and Exam")}</p>
            </div>
          </div>
          <div className="p-2 w-full flex flex-col sm:flex-row items-center gap-2 bg-surface-light dark:bg-surface-dark dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow shadow-white/5 rounded-lg">
            <span className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <IoInfiniteOutline className="sm:text-2xl text-purple-500" />
            </span>

            <div className="text-xs sm:text-sm flex flex-col gap-1">
              <span className="hidden sm:block text-gray-500 dark:text-gray-400">{t("Validity")}</span>
              <p>{t("Unlimited access")}</p>
            </div>
          </div>

        </div>


        <div className="my-2 mb-10 p-5 flex flex-col gap-2 bg-surface-light dark:bg-surface-dark dark:text-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>
                <MdOutlineMenuBook className="text-3xl text-primary" />
              </span>
              <p>{t("Course Content")}</p>
            </div>
            <p>{videoCount} {t("Lesson")}</p>
          </div>

          <div className="w-full rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-5 flex items-center justify-between bg-gray-100 dark:bg-gray-900 dark:text-gray-200">
              <p>
                {course.title}
              </p>
              <span>
                <IoIosArrowDown className="text-2xl cursor-pointer" />
              </span>
            </div>



            <div>
              {contentPending ? <div className="w-full flex items-center justify-center py-20  rounded-lg">
                <div className="w-10 h-10 border-4 border-neutral-quaternary border-t-primary rounded-full animate-spin" />
              </div> : contentError ? <div>Error</div> :
                renderContent}
            </div>


          </div>
        </div >

      </>
  )
}

export default Course