import { useQuery } from "@tanstack/react-query";
import API from "../config/axiosConfig";
import type { ICourseRes } from "../interfaces";
import { useLanguage } from "../context/useLanguage";
import Button from "../components/ui/Button";
import { FaPlus } from "react-icons/fa6";
import { IoAnalyticsSharp } from "react-icons/io5";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import CourseContainer from "../components/containers/CourseContainer";






const MyLearning = () => {
  const { t } = useLanguage();


  const { data, isPending, error } = useQuery<ICourseRes[]>({
    queryKey: ['my-learning'],
    queryFn: async () => {
      const response = await API.get('/courses');
      return response.data.data;
    },
  });

  return (
    <>
      <div className="m-5 mt-25 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">{t("دوراتي و مؤشرات التدريس")}</h3>
          <p className="text-gray-600">{t("مرحبا ا.محمود اليك نظرة شاملة عن ادائك و تفاعل طلابك")}</p>
        </div>
        <Button className="btn-sm btn-primary flex items-center gap-1">
          <FaPlus /> {t("Add Course")}
        </Button>
      </div>


      <div className="m-5 space-y-5">
        <div>
          <span className="bg-blue-500 text-white p-1 px-2 rounded-full">
            {t("All")} (8)
          </span>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow shadow-black/5">
          <div className="p-5 flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <span className="w-10 h-10 bg-primary/40 text-dark-bg p-2 rounded-lg flex items-center justify-center text-4xl">
                <IoAnalyticsSharp />
              </span>
              <div className="space-y-1">
                <h3 className="font-bold">{t("نمو التسجيل و تفاعل الطلاب")}</h3>
                <p className="text-gray-600 text-sm">{t("اخر 6 أشهر مع معدل اقبال قياسي")}</p>
              </div>
            </div>

            <span dir="ltr" className="bg-gray-100 px-2 rounded-full  text-green-600 flex items-center gap-1"> 25.3%+ <MdOutlineTrendingUp /></span>
          </div>
          <div className="h-50"></div>
        </div>
      </div>


      <div className="m-5 grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow shadow-black/5 p-5 flex items-center gap-2">
          <span className="w-10 h-10 bg-primary/40 text-dark-bg p-2 rounded-lg flex items-center justify-center text-4xl">
            <MdOutlineTrendingUp />
          </span>
          <div className="space-y-1">
            <h3 className="font-bold">{t("نمو التسجيل و تفاعل الطلاب")}</h3>
            <p className="text-gray-600 text-sm">{t("اخر 6 أشهر مع معدل اقبال قياسي")}</p>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow shadow-black/5 p-5 flex items-center gap-2">
          <span className="w-10 h-10 bg-primary/40 text-dark-bg p-2 rounded-lg flex items-center justify-center text-4xl">
            <MdOutlineTrendingDown />
          </span>
          <div className="space-y-1">
            <h3 className="font-bold">{t("نمو التسجيل و تفاعل الطلاب")}</h3>
            <p className="text-gray-600 text-sm">{t("اخر 6 أشهر مع معدل اقبال قياسي")}</p>
          </div>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow shadow-black/5 p-5 flex items-center gap-2">
          <span className="w-10 h-10 bg-primary/40 text-dark-bg p-2 rounded-lg flex items-center justify-center text-4xl">
            <MdOutlineTrendingDown />
          </span>
          <div className="space-y-1">
            <h3 className="font-bold">{t("نمو التسجيل و تفاعل الطلاب")}</h3>
            <p className="text-gray-600 text-sm">{t("اخر 6 أشهر مع معدل اقبال قياسي")}</p>
          </div>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow shadow-black/5 p-5 flex items-center gap-2">
          <span className="w-10 h-10 bg-primary/40 text-dark-bg p-2 rounded-lg flex items-center justify-center text-4xl">
            <MdOutlineTrendingDown />
          </span>
          <div className="space-y-1">
            <h3 className="font-bold">{t("نمو التسجيل و تفاعل الطلاب")}</h3>
            <p className="text-gray-600 text-sm">{t("اخر 6 أشهر مع معدل اقبال قياسي")}</p>
          </div>
        </div>
      </div>


      <div className="m-5 bg-surface-light dark:bg-surface-dark rounded-lg shadow shadow-black/5 p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold">{t("إدارة الدورات التدريبية")}</h3>
          <Button className="btn-sm btn-primary">{t("View All")}</Button>
        </div>

        <CourseContainer courses={data ? data.slice(0, 10) : []} isLoading={isPending} error={error} />
      </div>
    </>
  );
};

export default MyLearning;