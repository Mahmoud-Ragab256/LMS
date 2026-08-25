import { forwardRef, type InputHTMLAttributes, type Ref } from "react"
import type { IInput } from "../../interfaces";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  input: IInput;
}

const Input = forwardRef(({ input, ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  return (
    <>
      <input type={input.type} id={input.id} placeholder={input.placeholder} name={input.name} ref={ref} {...rest}
        className="h-10 border border-gray-200 dark:border-gray-800 rounded-md p-2 focus:outline-indigo-500 focus:outline-1 "
      />
    </>
  )
})

export default Input;