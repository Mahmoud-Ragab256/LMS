import { useState } from "react"
import { studentRegisterForm, teacherRegisterForm } from "../data/authForms";
import Input from "../components/ui/Input";
import { useLanguage } from "../context/useLanguage";
import Learners from '../assets/Learners.jpg'
import Button from "../components/ui/Button";



function Register() {

  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const { t } = useLanguage();

  const dataForm = isTeacher ? teacherRegisterForm : studentRegisterForm;

  const renderDataForm = dataForm.map((input, index) => {
    return (
      <div className="flex flex-col gap-2" key={index}>
        <label className="text-sm" htmlFor={input.id}>{input.label ? t(input.label) : t(input.name)}</label>
        <Input input={input}></Input>
      </div>
    )
  })

  return (
    <div className="container lg:w-300 m-auto flex h-155 border border-gray-300 dark:border-gray-700 dark:text-gray-300 rounded-md text-sm">
      <div className="relative hidden md:block w-full h-full">
        <div className="absolute z-30 flex flex-col justify-end inset-0 p-5 text-white">
          <h2 className="text-6xl font-bold">
            {t('join')} EduFlow
          </h2>
          <p className="text-lg mt-5">
            {t('join p')}
          </p>
        </div>
        <span className="absolute w-full h-full z-20 bg-primary/50 "></span>
        <img src={Learners} alt="learners" className="object-cover h-full" />
      </div>
      <div className="p-5 space-y-2 w-full h-full">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-primary">{t('register')} {t('new')}</h3>
          <h6 className="text-sm text-gray-700 dark:text-gray-300">{t('register p')}</h6>
        </div>
        <div className="p-1 flex gap-2 bg-gray-300 dark:bg-gray-700 rounded-md">
          <Button className={isTeacher ? `bg-gray-300 text-black dark:bg-gray-700 dark:text-gray-300 p-2` : `bg-light-bg text-black dark:bg-dark-bg dark:text-gray-300 p-2`} onClick={() => setIsTeacher(false)}>{t('student')}</Button>
          <Button className={isTeacher ? `bg-light-bg text-black dark:bg-dark-bg dark:text-gray-300 p-2` : `bg-gray-300 text-black dark:bg-gray-700 dark:text-gray-300 p-2`} onClick={() => setIsTeacher(true)} >{t('teacher')}</Button>
        </div>
        {renderDataForm}
        <Button >{t('register')} {isTeacher ? t('teacher') : t('student')}</Button>
        <p className="mt-2">
          {t('have_account?')} <a href="/login" className="text-primary hover:text-primary-hover">
            {t('login')} {t('now')}
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register;