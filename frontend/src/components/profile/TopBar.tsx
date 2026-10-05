import { MdVerified } from "react-icons/md";
import type { ITeacherRes } from "../../interfaces";
import { IoSettingsOutline } from "react-icons/io5";
import { GoShareAndroid } from "react-icons/go";
import Img from "../../assets/profile/icon-7797704_1280.png";

interface IProps {
  teacher: ITeacherRes;
}

const TopBar = ({ teacher }: IProps) => {
  return (
    <>
      <div className="m-5 mt-25 p-5 space-y-2 bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm shadow-black/5">
        <div className="flex items-start justify-between">
          <div className="relative w-20 h-20 rounded-full">
            <img src={teacher.imgUrl ? teacher.imgUrl : Img} alt={teacher.username} className="w-full h-full object-cover rounded-full" />
            <span className="relative w-3 h-3 bottom-4 inset-s-2 rounded-full bg-white flex items-center justify-center">
              <MdVerified className="absolute text-blue-600 text-xl" />
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center justify-center text-xl bg-primary text-white rounded-full w-10 h-10 cursor-pointer">
              <IoSettingsOutline />
            </span>
            <span className="flex items-center justify-center text-xl bg-primary text-white rounded-full w-10 h-10 cursor-pointer">
              <GoShareAndroid />
            </span>
          </div>

        </div>

        <div className="flex flex-col items-start justify-start gap-2 dark:text-gray-300">
          <div className="flex items-end gap-2">
            <h1 className="inline-block text-2xl font-semibold"> {teacher.username} </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400 ">{teacher.coursesCount ? teacher.coursesCount : "0"} Courses</span>
          </div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Teacher Of Subject <span className="text-primary">{teacher.subject ? teacher.subject : "Not specified"}</span></h3>
        </div>
      </div>
    </>
  )
}

export default TopBar