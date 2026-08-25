interface IProps {
  message?: string;
}

function InputErrorMessage({ message }: IProps) {
  return (
    <>
      <span className="text-red-600 text-[12px]">{message}</span>
    </>
  )
}

export default InputErrorMessage