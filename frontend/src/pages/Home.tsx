import Button from "../components/ui/Button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { FaCompass, FaGraduationCap } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong, FaUserCheck, FaMedal, FaRegCopyright } from "react-icons/fa6";
import img1 from '../assets/profile-1.jpg';
import img2 from '../assets/profile-2.jpg';
import img3 from '../assets/profile-3.jpeg';
import Physics from '../assets/physics.jpeg';
import Ai_Data from '../assets/AI-Data.jpg';
import { MdOutlineVerified } from "react-icons/md";
import { useLanguage } from "../context/useLanguage";
import i18n from "../i18next";
import CourseContainer from "../components/containers/CourseContainer";
import { useEffect, useState } from "react";
import API from "../config/axiosConfig";



function Home() {

  const { t } = useLanguage();
  const [courses, setCourses] = useState([]);
  const dir = i18n.dir();

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await API.get("/courses");
      setCourses(response.data.data);
    }

    fetchCourses();
  }, [])


  return (
    <>
      <section className="m-auto p-5 py-25 pt-40 flex bg-indigo-50 bg-linear-to-t from-[#FAFAFF] to-indigo-50">
        <div className="container mx-auto space-y-7.5 space-x-5 lg:space-x-10">
          <div className="p-2 px-8 bg-indigo-100 border border-indigo-400 rounded-full text-primary w-fit text-sm font-medium">
            <li>{t("New : Smart Study Plans")}</li>
          </div>
          <div className="text-5xl font-bold leading-tight">
            <h3>{t("Master Your Study With")}</h3>
            <span className="text-primary">EDU FLOW</span>
          </div>
          <p className="text-sm max-w-100">{t("A comprehensive educational platform designed specifically for primary, middle, and high school levels; achieve your academic goals with ease and efficiency.")}</p>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <Button className="flex items-center justify-center gap-2 hover:scale-103">{t("Start")} {t("Learning")}{dir === "ltr" ? <FaArrowRight /> : <FaArrowLeft />}</Button>
            <Button className="btn-outline flex items-center justify-center gap-2 hover:scale-103 hover:bg-transparent hover:text-primary">{t("Start")} {t("Teaching")} <FaGraduationCap /></Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-3">
              <span className="block w-10 h-10 rounded-full border-2 border-white"><img src={img1} alt="img1" className="w-full h-full rounded-full object-cover" /></span>
              <span className="block  w-10 h-10 rounded-full border-2 border-white"><img src={img2} alt="img2" className="w-full h-full rounded-full object-cover" /></span>
              <span className="block w-10 h-10 rounded-full border-2 border-white"><img src={img3} alt="img3" className="w-full h-full rounded-full object-cover" /></span>
            </div>
            <p>{t("Trusted by 50,000+ active learners worldwide")}</p>
          </div>
        </div>
        <div className="hidden md:block container mx-auto p-10 pt-5 space-y-5">
          <div className="flex relative gap-10">
            <div className="w-full h-100 p-5 bg-white rounded-xl flex flex-col gap-5 shadow-xl shadow-black/5">
              <img src={Physics} alt="Physics" className="rounded-lg h-[50%] object-cover" />
              <p className="font-bold text-sm md:text-lg">layman’s look at the latest in physics</p>
              <div className="space-y-2">
                <div className="w-full bg-gray-300 h-2 rounded-full">
                  <span className="block w-[75%] h-full bg-primary rounded-full z-10"></span>
                </div>
                <p className="text-sm md:text-md font-light">75% Completed</p>
              </div>
            </div>
            <div className="mt-10 w-full h-95 p-5 bg-white rounded-xl flex flex-col gap-3 shadow-xl shadow-black/5">
              <img src={Ai_Data} alt="AI & Data" className="rounded-lg h-[50%] object-cover" />
              <p className="font-bold text-sm md:text-lg">AI & Data Science A-Z</p>
              <div className="space-y-2">
                <p className="text-sm md:text-md text-gray-500 font-bold">Next session in 2 hours</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-5 rounded-2xl shadow-xl shadow-black/5">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-200 text-secondary text-2xl">
              <MdOutlineVerified />
            </span>
            <div>
              <p className="font-bold">Course Completed!</p>
              <p>you have finished the course</p>
            </div>
          </div>
        </div>
      </section>
      <section className="m-auto p-5 py-25 flex flex-col gap-5 items-center sm:items-start dark:text-gray-300">
        <h4 className="text-4xl font-bold">{t("Featured Learning Path")}</h4>
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-sm max-w-100 text-center sm:text-start">{t("Study programs curated and designed by education experts to take you from understanding the basics to excelling in exams.")}</p>
          <a className="flex items-center gap-2 p-2 rounded-full text-primary cursor-pointer hover:scale-103 transition duration-300" href="/courses">
            {t("View All Courses")} {dir === "ltr" ? <FaArrowRightLong /> : <FaArrowLeftLong />}
          </a>
        </div>
        <CourseContainer courses={courses.slice(0, 4)} />
      </section>
      <section className="m-auto p-5 py-25 flex flex-col gap-5 items-center text-center dark:text-gray-300">
        <h4 className="text-4xl font-bold">{t("Your Path to Academic Success")}</h4>
        <p className="max-w-150">{t("A streamlined learning process designed to keep you motivated and on track towards your academic goals.")}</p>
        <div className="relative w-full p-5 flex flex-col items-center md:flex-row md:items-start gap-10 justify-between">
          <span className="hidden md:block absolute w-[70%] h-1 left-1/2 top-21 -translate-1/2 bg-gray-200 dark:bg-gray-800 rounded-full -z-10"></span>
          <div className="p-5 flex flex-col items-center gap-5">
            <span className="flex items-center justify-center w-20 h-20 rounded-xl text-4xl bg-gray-50 dark:bg-gray-800 text-primary shadow-lg shadow-black/10 dark:shadow-md dark:shadow-black/10 cursor-pointer hover:scale-105 transition duration-300">
              <FaCompass />
            </span>
            <h6 className="text-2xl font-medium">1. {t("explore")}</h6>
            <p className="max-w-100">{t("Explore hundreds of lessons and study materials across all educational curricula.")}</p>
          </div>
          <div className="p-5 flex flex-col items-center gap-5">
            <span className="flex items-center justify-center w-20 h-20 rounded-xl text-4xl bg-gray-50 dark:bg-gray-800 text-primary shadow-lg shadow-black/10 dark:shadow-md dark:shadow-black/10 cursor-pointer hover:scale-105 transition duration-300">
              <FaUserCheck />
            </span>
            <h6 className="text-2xl font-medium">2. {t("Enroll & Learn")}</h6>
            <p className="max-w-100">{t("Engage with interactive content, hands-on projects, and discussions with your peers.")}</p>
          </div>
          <div className="p-5 flex flex-col items-center gap-5">
            <span className="flex items-center justify-center w-20 h-20 rounded-xl text-4xl bg-gray-50 dark:bg-gray-800 text-primary shadow-lg shadow-black/10 dark:shadow-md dark:shadow-black/10 cursor-pointer hover:scale-105 transition duration-300">
              <FaMedal />
            </span>
            <h6 className="text-2xl font-medium">3. {t("Excellence & Brilliance")}</h6>
            <p className="max-w-100">{t("Achieve excellent grades and open new doors for your academic future.")}</p>
          </div>
        </div>
      </section>
      <section className="m-auto p-10 py-10 flex flex-col items-center gap-10 md:flex-row md:justify-between bg-gray-300 dark:bg-gray-800 dark:text-gray-300 text-md text-nowrap">
        <h3 className="text-primary font-bold text-2xl">EDU FLOW</h3>
        <div className="flex justify-center flex-wrap gap-5">
          <p className="hover:text-primary transition duration-300 cursor-pointer">Privacy Policy</p>
          <p className="hover:text-primary transition duration-300 cursor-pointer">Terms of Service</p>
          <p className="hover:text-primary transition duration-300 cursor-pointer">Help Center</p>
          <p className="hover:text-primary transition duration-300 cursor-pointer">Contact Support</p>
        </div>
        <p className="flex items-center text-sm gap-1">
          <FaRegCopyright className="inline-block" />  2026  EDU FLOW Global, {t("All rights reserved")}
        </p>
      </section>
    </>
  )
}

export default Home;