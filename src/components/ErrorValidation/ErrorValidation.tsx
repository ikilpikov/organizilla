import style from "./ErrorValidation.module.scss";

interface IErrorMessageProps {
  message: string;
}
const ErrorValidation = ({ message }: IErrorMessageProps) => {
  return <p className={style.message}>{message}</p>;
};

export default ErrorValidation;
