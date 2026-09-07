import { useState } from "react"
import { studentRegisterForm, teacherRegisterForm } from "../data/authForms";
import Input from "../components/ui/Input";
import { useLanguage } from "../context/useLanguage";
import Button from "../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import API from "../config/axiosConfig";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Learners from '../assets/Learners.jpg'
import { registerStudentSchema, registerTeacherSchema } from "../validation/authValidation";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from "js-cookie";
import type { IUser } from "../interfaces";
import { useNavigate } from "react-router";


function Register() {

  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const currentSchema = isTeacher ? registerTeacherSchema : registerStudentSchema;
  const { register, handleSubmit, formState: { errors } } = useForm<IUser>({ resolver: zodResolver(currentSchema) });


  const { mutateAsync: postNewUser } = useMutation({
    mutationFn: async (data: { username: string, email: string, password: string, phone: string, nid?: string }) => {
      const { username, email, password, phone, nid } = data;
      if (isTeacher) {
        const res = await API.post('/auth/register/teacher', {
          username,
          email,
          password,
          phone
        });
        return res.data;
      } else {
        const res = await API.post('/auth/register/student', {
          username,
          email,
          password,
          phone,
          nid
        });
        return res.data;
      }
    },
    onError: (error: any) => {
      const res = error.response

      if (res.status === 409) {
        toast.error(res.data.message, {
          className: '!bg-gray-300 dark:!bg-gray-700 dark:!text-white'
        });
      }
    }
  })

  const onSubmitHandler: SubmitHandler<IUser> = async (data) => {
    const res = await postNewUser(data);
    Cookies.set('token', res.token);
    delete res.token;
    localStorage.setItem("user", JSON.stringify(res.data));
    navigate('/');
  }


  const dataForm = isTeacher ? teacherRegisterForm : studentRegisterForm;

  const renderDataForm = dataForm.map((input, index) => {
    return (
      <div className="flex flex-col gap-2" key={index}>
        <label className="text-sm" htmlFor={input.id}>{input.label ? t(input.label) : t(input.name)}</label>
        <Input input={input} {...register(input.name)}></Input>
        {errors[input.name] && <InputErrorMessage message={errors[input.name]?.message} />}
      </div>
    )
  })

  return (
    <>
      <div className="container lg:w-250 m-auto flex min-h-140 border border-gray-300 dark:border-gray-700 dark:text-gray-300 rounded-md text-sm overflow-hidden">
        <div className="relative hidden md:block w-full min-h-140">
          <div className="absolute z-30 flex flex-col justify-end inset-0 p-5 text-white">
            <h2 className="text-6xl font-bold">
              {t('join')} EduFlow
            </h2>
            <p className="text-lg mt-5">
              {t('join p')}
            </p>
          </div>
          <span className="absolute w-full h-full z-20 bg-primary/50 "></span>
          <div className="h-full w-full">
            <img src={Learners} alt="learners" className="object-cover h-full w-full" />
          </div>
        </div>
        <form className="p-5 space-y-2 w-full min-h-140 bg-gray-200/50 dark:bg-gray-900/50" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-primary">{t('register')} {t('new')}</h3>
            <h6 className="text-sm text-gray-700 dark:text-gray-300">{t('register p')}</h6>
          </div>
          <div className="p-1 flex gap-2 bg-gray-300 dark:bg-gray-700 rounded-md">
            <Button className={isTeacher ? `bg-gray-300 text-black dark:bg-gray-700 dark:text-gray-300 p-2` : `bg-light-bg text-black dark:bg-dark-bg dark:text-gray-300 p-2`} onClick={() => setIsTeacher(false)} type="button">{t('student')}</Button>
            <Button className={isTeacher ? `bg-light-bg text-black dark:bg-dark-bg dark:text-gray-300 p-2` : `bg-gray-300 text-black dark:bg-gray-700 dark:text-gray-300 p-2`} onClick={() => setIsTeacher(true)} type="button" >{t('teacher')}</Button>
          </div>
          {renderDataForm}
          <Button>{t('register')} {isTeacher ? t('teacher') : t('student')}</Button>
          <p className="mt-2">
            {t('have_account?')} <a href="/login" className="text-primary hover:text-primary-hover">
              {t('login')} {t('now')}
            </a>
          </p>
          <Toaster />
        </form>
      </div>
    </>
  )
}

export default Register;