import type { InputHTMLAttributes } from "react"
import type { IInput } from "../../interfaces";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  input: IInput;
}

function Input({ input, ...rest }: IProps) {
  return (
    <>
      <input type={input.type} id={input.id} placeholder={input.placeholder} name={input.name} {...rest}
        className="h-10 border border-gray-200 dark:border-gray-800 rounded-md p-2 focus:outline-indigo-500 focus:outline-1 "
      />
    </>
  )
}

export default Input;