import { useState } from "react";
import { loginForm } from "../data/authForms";
import Input from "../components/ui/Input";
import { useLanguage } from "../context/useLanguage";
import Button from "../components/ui/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/authValidation";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { useMutation } from "@tanstack/react-query";
import API from "../config/axiosConfig";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";


function Login() {

  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const { t } = useLanguage();
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });


  const { mutateAsync: loginUser } = useMutation({
    mutationFn: async (data: { email: string, password: string }) => {
      const { email, password } = data;
      if (isTeacher) {
        const res = await API.post('/auth/login/teacher', { email, password });
        return res.data;
      } else {
        const res = await API.post('/auth/login/student', { email, password });
        return res.data;
      }

    }, onError(error: any) {
      const res = error.response;
      toast.error(res.data.message, {
        className: '!bg-gray-300 dark:!bg-gray-700 dark:!text-white'
      });
    }
  });




  const onSubmit: SubmitHandler<{ email: string, password: string }> = async (data) => {
    const res = await loginUser(data);
    Cookies.set('token', res.token);
    delete res.token;
    localStorage.setItem("user", JSON.stringify(res.data));
    checkAuth();
    navigate('/');
  }

  const renderInputs = loginForm.map((input, index) => {
    return (
      <div className="flex flex-col gap-2" key={index}>
        <label htmlFor={input.id}>{input.label ? t(input.label) : t(input.name)}</label>
        <Input input={input} {...register(input.name)}></Input>
        {errors && <InputErrorMessage message={errors[input.name]?.message} />}
      </div>
    )
  })
  return (
    <div className="w-75 md:w-100 lg:w-150 m-auto mt-10 dark:text-gray-300 bg-gray-200/50 dark:bg-gray-900/50 p-5 rounded-md text-sm border border-gray-700/20 dark:border-gray-300/20 overflow-hidden">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-primary">{t('login')}</h3>
        </div>
        <div className="p-1 flex gap-2 bg-gray-300 dark:bg-gray-700 rounded-md">
          <Button className={isTeacher ? `bg-gray-300 text-black dark:bg-gray-700 dark:text-gray-300 p-2` : `bg-light-bg text-black dark:bg-dark-bg dark:text-gray-300 p-2`} onClick={() => setIsTeacher(false)} type="button">{t('student')}</Button>
          <Button className={isTeacher ? `bg-light-bg text-black dark:bg-dark-bg dark:text-gray-300 p-2` : `bg-gray-300 text-black dark:bg-gray-700 dark:text-gray-300 p-2`} onClick={() => setIsTeacher(true)} type="button" >{t('teacher')}</Button>
        </div>
        {renderInputs}
        <Button>{t('login')} {isTeacher ? t('teacher') : t('student')}</Button>
        <Toaster />
      </form>
    </div>
  )
}

export default Login;