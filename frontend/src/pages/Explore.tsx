import { MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import Button from "../components/ui/Button";
import { useLanguage } from "../context/useLanguage";
import { VscSettingsCompact } from "react-icons/vsc";
import { categories, levels } from "../data/categories";
import { IoMdCheckmark } from "react-icons/io";
import { BiFilterAlt } from "react-icons/bi";
import TeacherContainer from "../components/containers/TeacherContainer";
import CourseContainer from "../components/containers/CourseContainer";
import i18n from "../i18next";
import { useState } from "react";


interface IElementVal {
  filter: boolean;
  category: boolean;
  level: boolean;
  price: boolean;
  categorySort: boolean;
  teacher: boolean;
  teacherSort: boolean;
}

function Explore() {

  const initVal: IElementVal = {
    filter: false,
    category: false,
    level: false,
    price: false,
    categorySort: false,
    teacher: false,
    teacherSort: false
  }


  let pl = 'Physics';



  const { t } = useLanguage();
  const dir = i18n.dir();



  const [isElementOpen, setIsElementOpen] = useState<IElementVal>(initVal);
  const [show, setShow] = useState<"all" | "courses" | "teachers">("all");






  const elementToggle = (element: string) => {
    setIsElementOpen((prev) => ({ ...prev, [element]: !(prev as unknown as Record<string, boolean>)[element] }))
  }


  const arrowing = (truthy: boolean) => {
    return truthy ? <MdKeyboardArrowDown /> : dir === "ltr" ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />
  }






  const renderCategories = categories.map((category, index) => {
    return (
      <>
        {pl === category ? <span key={index} className="p-0.5 px-2 w-fit bg-primary text-white text-sm font-light shadow shadow-black/5 rounded-full flex items-center gap-1 cursor-pointer">{t(category)} <IoMdCheckmark /></span>
          : <span key={index} className="p-0.5 px-2 bg-gray-50 dark:bg-surface-dark dark:text-gray-300 text-sm font-light shadow shadow-black/5 rounded-full cursor-pointer">{t(category)}</span>
        }
      </>
    )
  })

  const renderLevels = levels.map((level, index) => {
    return (
      <>
        {pl === level ? <span key={index} className="p-0.5 px-2 w-fit bg-primary text-white text-sm font-light shadow shadow-black/5 rounded-full flex items-center gap-1 cursor-pointer">{t(level)} <IoMdCheckmark /></span>
          : <span key={index} className="p-0.5 px-2 bg-gray-50 dark:bg-surface-dark dark:text-gray-300 text-sm font-light shadow shadow-black/5 rounded-full cursor-pointer">{t(level)}</span>
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
        <div className="relative bg-primary rounded-xl flex items-center justify-center cursor-pointer" >
          <div className="w-full h-full p-2" onClick={() => elementToggle("filter")}>
            <VscSettingsCompact className="text-white text-2xl" />
          </div>
          <div className={`${isElementOpen.filter ? null : "hidden"} absolute -bottom-152 inset-e-0 w-60 h-150 rounded-xl shadow bg-indigo-100/95 dark:bg-indigo-950/90 text-sm font-medium p-5 cursor-auto overflow-y-scroll scrollbar-thumb-gray-100 dark:scrollbar-thumb-gray-700`}>
            <div>

              {(show === "courses" || show === "all") ?
                <>
                  <div>
                    <span className="flex items-center cursor-pointer" onClick={() => elementToggle("category")}>{t("Category")} {arrowing(isElementOpen.category)}</span>
                    <div className={`${isElementOpen.category ? null : "hidden"} flex gap-1 flex-wrap my-2`}>
                      {renderCategories}
                    </div>
                  </div>

                  <hr className="text-gray-300 dark:text-gray-700 my-1" />

                  <div >
                    <span className="flex items-center cursor-pointer" onClick={() => elementToggle("level")}>{t("Level")} {arrowing(isElementOpen.level)}</span>
                    <div className={`${isElementOpen.level ? null : "hidden"} flex gap-1 flex-wrap my-2`}>
                      {renderLevels}
                    </div>
                  </div>

                  <hr className="text-gray-300 dark:text-gray-700 my-1" />

                  <div className="flex flex-col">
                    <span className="flex items-center cursor-pointer" onClick={() => elementToggle("price")}>{t("Price")} {arrowing(isElementOpen.price)}</span>
                    <div className={`${isElementOpen.price ? null : "hidden"} flex items-center flex-wrap gap-2 mt-2`}>
                      <div className="flex justify-between items-center text-sm font-semibold text-gray-800">
                        <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full font-medium">100 {t("EGP")} - 800 {t("EGP")}</span>
                      </div>

                      <div className="relative w-full h-6 flex items-center">
                        <div className="absolute w-full h-1.5 bg-gray-100 rounded-full"></div>
                        <div className="absolute right-[20%] left-[30%] h-1.5 bg-blue-600 rounded-full"></div>
                        <div className="absolute right-[20%] w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow cursor-pointer"></div>
                        <div className="absolute left-[30%] w-4 h-4 bg-white border-2 border-blue-600 rounded-full shadow cursor-pointer"></div>
                      </div>
                    </div>
                    <div className={`${isElementOpen.price ? null : "hidden"} flex justify-between text-sm`}>
                      <span>{t("Min")}</span>
                      <span>{t("Max")}</span>
                    </div>
                  </div>

                  <hr className="text-gray-300 dark:text-gray-700 my-1" />

                  <div className="flex flex-col text-right w-full my-5">
                    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow shadow-black/10 dark:shadow-white/5" onClick={() => elementToggle("categorySort")}>

                      <div className="flex items-center justify-between p-3.5 cursor-pointer select-none">
                        <span className="flex items-center gap-1">
                          {t("Sort By")} :
                          <span className="px-3 font-semibold text-sm text-primary">{t("Newest")}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <MdKeyboardArrowDown className="text-2xl" />
                        </div>
                      </div>

                      <div className={`${isElementOpen.categorySort ? null : "hidden"} border-t border-gray-100 dark:border-gray-700 py-2 overflow-hidden transition-all duration-300 ease-in-out`}>
                        <div className="w-full text-right px-4 py-2.5 text-sm bg-gray-200 dark:bg-gray-900 font-semibold cursor-pointer">
                          {t("Newest")}
                        </div>
                        <div className="w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          {t("Oldest")}
                        </div>
                        <div className="w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          {t("Max")} {t("Price")}
                        </div>
                        <div className="w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                          {t("Min")} {t("Price")}
                        </div>
                      </div>

                    </div>

                  </div>
                </> : null
              }

              {(show === "teachers" || show === "all") ?
                <>
                  <div>
                    <span className="flex items-center cursor-pointer" onClick={() => elementToggle("teacher")}>{t("Teacher")} {arrowing(isElementOpen.teacher)}</span>
                    <div className={`${isElementOpen.teacher ? null : "hidden"} space-y-3 mt-2`}>
                      <div className="flex flex-col gap-1">
                        <div className="space-x-1">
                          <input type="checkbox" id="active" name="activation" />
                          <label htmlFor="active">active</label>
                        </div>
                        <div className="space-x-1">
                          <input type="checkbox" id="inactive" name="activation" />
                          <label htmlFor="inactive">inactive</label>
                        </div>
                      </div>


                    </div>
                  </div>
                  <hr className="text-gray-300 dark:text-gray-700 my-1" />

                  <div className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow shadow-black/10 dark:shadow-white/5 my-5">

                    <div className="flex items-center justify-between p-3.5 cursor-pointer select-none" onClick={() => elementToggle("teacherSort")}>
                      <span className="flex items-center gap-1">
                        {t("Sort By")} :
                        <span className="px-3 font-semibold text-sm text-primary">{t("Newest")}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <MdKeyboardArrowDown className="text-2xl" />
                      </div>
                    </div>

                    <div className={`${isElementOpen.teacherSort ? null : "hidden"} border-t border-gray-100 dark:border-gray-700 py-2 overflow-hidden transition-all duration-300 ease-in-out`}>
                      <div className="w-full text-right px-4 py-2.5 text-sm bg-gray-200 dark:bg-gray-900 font-semibold cursor-pointer">
                        {t("Newest")}
                      </div>
                      <div className="w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                        {t("Oldest")}
                      </div>
                    </div>
                  </div>
                </> : null}
              {/* <div>
                <span className="flex items-center cursor-pointer" onClick={() => elementToggle("teacher")}>{t("Teacher")} {arrowing(isElementOpen.teacher)}</span>
                <div className={`${isElementOpen.teacher ? null : "hidden"} space-y-3 mt-2`}>
                  <div className="flex flex-col gap-1">
                    <div className="space-x-1">
                      <input type="checkbox" id="active" name="activation" />
                      <label htmlFor="active">active</label>
                    </div>
                    <div className="space-x-1">
                      <input type="checkbox" id="inactive" name="activation" />
                      <label htmlFor="inactive">inactive</label>
                    </div>
                  </div>


                </div>
              </div>

              <hr className="text-gray-300 dark:text-gray-700 my-1" />

              <div className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow shadow-black/10 dark:shadow-white/5 my-5">

                <div className="flex items-center justify-between p-3.5 cursor-pointer select-none" onClick={() => elementToggle("teacherSort")}>
                  <span className="flex items-center gap-1">
                    {t("Sort By")} :
                    <span className="px-3 font-semibold text-sm text-primary">{t("Newest")}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <MdKeyboardArrowDown className="text-2xl" />
                  </div>
                </div>

                <div className={`${isElementOpen.teacherSort ? null : "hidden"} border-t border-gray-100 dark:border-gray-700 py-2 overflow-hidden transition-all duration-300 ease-in-out`}>
                  <div className="w-full text-right px-4 py-2.5 text-sm bg-gray-200 dark:bg-gray-900 font-semibold cursor-pointer">
                    {t("Newest")}
                  </div>
                  <div className="w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                    {t("Oldest")}
                  </div>
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center p-1 gap-1 bg-gray-100 rounded-xl dark:bg-gray-800">
        <Button className={`p-1 ${show === 'all' ? 'bg-surface-light dark:bg-dark-bg text-primary shadow shadow-black/5 dark:shadow-gray-300/5' : 'bg-transparent text-gray-700 dark:text-gray-300'}`} onClick={() => setShow("all")}>{t("All")} <span>(240)</span></Button>
        <Button className={`p-1 ${show === 'courses' ? 'bg-surface-light dark:bg-dark-bg text-primary shadow shadow-black/5 dark:shadow-gray-300/5' : 'bg-transparent text-gray-700 dark:text-gray-300'}`} onClick={() => setShow("courses")}>{t("Courses")} <span>(240)</span></Button>
        <Button className={`p-1 ${show === 'teachers' ? 'bg-surface-light dark:bg-dark-bg text-primary shadow shadow-black/5 dark:shadow-gray-300/5' : 'bg-transparent text-gray-700 dark:text-gray-300'}`} onClick={() => setShow("teachers")}>{t("Teachers")} <span>(240)</span></Button>
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