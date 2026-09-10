import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import Button from "../components/ui/Button";
import { useLanguage } from "../context/useLanguage";
import { VscSettingsCompact } from "react-icons/vsc";
import { categories } from "../data/categories";
import { IoMdCheckmark } from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import TeacherContainer from "../components/containers/TeacherContainer";
import CourseContainer from "../components/containers/CourseContainer";



function Explore() {

  const { t } = useLanguage();

  let pr = 'all'
  let pl = 'Physics'






  const renderCategories = categories.map((level, index) => {
    return (
      <>
        {pl === level ? <span key={index} className="p-1 px-5 bg-primary text-white shadow shadow-black/5 rounded-full flex items-center gap-2 cursor-pointer">{level} <IoMdCheckmark /></span>
          : <span key={index} className="p-1 px-5 bg-gray-100 shadow shadow-black/5 rounded-full cursor-pointer">{level}</span>
        }
      </>
    )
  })



  return (
    <div className="p-3 px-5 space-y-3 dark:text-gray-300">
      <div className="flex items-center gap-2 mt-20">
        <span className="w-full flex items-center gap-2 bg-surface-light p-2 rounded-xl shadow shadow-black/5 dark:bg-gray-800">
          <label className="flex items-center justify-center p-1 cursor-pointer" htmlFor="explore-search"><IoIosSearch /></label>
          <input type="text" name="search" id="explore-search" placeholder={t('Search for a course, subject, or teacher.')} className="w-full h-full outline-0" />
        </span>
        <span className="p-2 bg-primary rounded-xl text-white text-2xl flex items-center justify-center cursor-pointer"><VscSettingsCompact /></span>
      </div>
      <div className="flex items-center p-1 gap-1 bg-gray-100 rounded-xl dark:bg-gray-800">
        <Button className={`p-1 ${pr === 'all' ? 'bg-surface-light dark:bg-dark-bg text-primary shadow shadow-black/5 dark:shadow-gray-300/5' : 'bg-transparent text-gray-700 dark:text-gray-300'}`}>{t("All")} <span>(240)</span></Button>
        <Button className={`p-1 ${pr === 'courses' ? 'bg-surface-light dark:bg-dark-bg text-primary shadow shadow-black/5 dark:shadow-gray-300/5' : 'bg-transparent text-gray-700 dark:text-gray-300'}`}>{t("Courses")} <span>(240)</span></Button>
        <Button className={`p-1 ${pr === 'teachers' ? 'bg-surface-light dark:bg-dark-bg text-primary shadow shadow-black/5 dark:shadow-gray-300/5' : 'bg-transparent text-gray-700 dark:text-gray-300'}`}>{t("Teachers")} <span>(240)</span></Button>
      </div>
      <div className="flex items-center justify-between bg-indigo-100 dark:bg-indigo-950 p-2 px-5 rounded-xl">
        <div className="flex items-center gap-2">
          <BiFilterAlt className="text-primary text-xl" /> {t("Displayed Results")} :
        </div>
        <span className="text-primary cursor-pointer">{t("Reset")}</span>
      </div>
      <div className="py-5 space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-medium">
            <span className="block w-3 h-8 rounded-xl bg-primary"></span>
            {t('Elite')} {t('Teachers')}
          </div>
          <Button className="btn-sm">{t("View All")}</Button>
        </div>

        <TeacherContainer />
      </div>

      <div className="py-5 space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-medium">
            <span className="block w-3 h-8 rounded-xl bg-secondary"></span>
            {t('Latest and most prominent courses')}
          </div>
          <Button className="btn-sm btn-secondary">{t("View All")}</Button>
        </div>

        <CourseContainer courses={[]} />
      </div>
      {/* <div className="flex items-center justify-center flex-wrap gap-3">
        {renderLevels}
      </div> */}
    </div>
  )
}

export default Explore;