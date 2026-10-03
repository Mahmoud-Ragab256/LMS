import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router"
import API from "../config/axiosConfig";
import type { ICourseRes } from "../interfaces";
import { FaCirclePlay } from "react-icons/fa6";
import { useLanguage } from "../context/useLanguage";
import { BsFire } from "react-icons/bs";
import Button from "../components/ui/Button";
import Img from '../assets/profile/icon-7797704_1280.png';
import { MdVerified } from "react-icons/md";



interface IProps {

}

function Courses({ }: IProps) {

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

  return (
    isPending ? <div> pending </div> : error ? <div>Error</div> :
      <>
        <div className="mt-20 flex flex-col bg-surface-light">
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
              <span className="p-0.5 px-2 rounded-full bg-gray-800/10 text-gray-800 text-sm">{t(course.level)}</span>
              <span className="p-0.5 px-2 rounded-full bg-primary/10 text-primary text-sm">{t(course.category)}</span>
            </div>
            <h2 className="font-medium">{course.title}</h2>
            <p className="text-sm">{course.description}</p>
          </div>
        </div>

        <div className="my-2 p-5 bg-surface-light flex items-center justify-between">
          <Button className="btn-outline btn-sm">{t("View Profile")}</Button>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-start gap-2">
              <h4>{course.teacherName}</h4>
            </div>
            <span className="relative w-10 h-10 ">
              <img src={course.teacherImg ? course.teacherImg : Img} alt="Teacher Image" className="w-full h-full rounded-full overflow-hidden object-cover" />
              <MdVerified className="absolute bottom-0 inset-e-0 text-blue-600 text-xs" />
            </span>
          </div>
        </div>

      </>
  )
}

export default Courses