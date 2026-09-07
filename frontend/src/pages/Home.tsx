import Button from "../components/ui/Button";
import { FaArrowRight } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import img1 from '../assets/profile-1.jpg';
import img2 from '../assets/profile-2.jpg';
import img3 from '../assets/profile-3.jpeg';
import Physics from '../assets/physics.jpeg';
import Ai_Data from '../assets/AI-Data.jpg';
import { MdOutlineVerified } from "react-icons/md";

interface IProps {

}

function Home({ }: IProps) {
  return (
    <section className="m-auto p-5 py-20 flex bg-indigo-50 bg-linear-to-t from-[#FAFAFF] to-indigo-50">
      <div className="container mx-auto space-y-7.5">
        <div className="p-2 px-8 bg-indigo-100 border border-indigo-400 rounded-full text-primary w-fit text-sm font-medium">
          <li>New : A-Powered Learning Path</li>
        </div>
        <div className="text-5xl font-bold leading-tight">
          <h3>Master Your Craft With</h3>
          <span className="text-primary">EDU FLOW</span>
        </div>
        <p className="text-sm">The modern learning management system designed for clarity, focus, and measurable results. Join thousands of professionals accelerating their careers</p>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button className="flex items-center justify-center gap-2 hover:scale-105">Start Learning <FaArrowRight /></Button>
          <Button className="btn-outline flex items-center justify-center gap-2 hover:scale-105 hover:bg-transparent hover:text-primary">Start Teaching <FaGraduationCap /></Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-3">
            <span className="block w-10 h-10 rounded-full border-2 border-white"><img src={img1} alt="img1" className="w-full h-full rounded-full object-cover" /></span>
            <span className="block  w-10 h-10 rounded-full border-2 border-white"><img src={img2} alt="img2" className="w-full h-full rounded-full object-cover" /></span>
            <span className="block w-10 h-10 rounded-full border-2 border-white"><img src={img3} alt="img3" className="w-full h-full rounded-full object-cover" /></span>
          </div>
          <p>Trusted by 50,000+ active learners worldwide</p>
        </div>
      </div>
      <div className="hidden md:block container mx-auto p-10 space-y-5">
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
  )
}

export default Home;