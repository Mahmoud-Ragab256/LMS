import { HiOutlineExternalLink } from "react-icons/hi";
import Img from '../../assets/profile-1.jpg';
import { useLanguage } from "../../context/useLanguage";

interface IProps {

}

function TeacherContainer({ }: IProps) {

  const { t } = useLanguage();


  // grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
  // flex items-center flex-wrap
  return (
    <>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 justify-center gap-5">
        <div className="min-w-70 max-w-120 bg-surface-light dark:bg-surface-dark rounded-xl shadow shadow-black/5 dark:shadow-white/5 flex flex-col gap-5 p-5">
          <div className="flex items-center gap-5">
            <span className="w-20 h-20 rounded-xl overflow-hidden">
              <img src={Img} alt="Teacher Img" className="w-full h-full object-cover" />
            </span>
            <div className="space-y-2">
              <h6 className="font-medium">Mahmoud Ragab</h6>
              <p className="text-white px-3 rounded-full bg-secondary/90 w-fit">{t("Physics")}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-5 flex items-center justify-around bg-gray-100 dark:bg-gray-700 rounded-xl font-medium">
              <div className="flex flex-col items-center">
                <span>{t("Courses Count")}</span>
                <span>6</span>
              </div>
              <div className="text-green-600">
                active
              </div>
            </div>

            <a className="w-full p-2 bg-primary hover:bg-primary-hover transition duration-300 text-white text-xl rounded-lg flex items-center justify-center" href={`/teachers/id`}>
              <HiOutlineExternalLink />
            </a>
          </div>
        </div>

      </div>
    </>
  )
}

export default TeacherContainer;