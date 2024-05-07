import style from './ErrorMessage.module.scss';

interface IErrorMessageProps {
    message: string;
}
const ErrorMessage = ({ message }: IErrorMessageProps) => {
    return <p className={style.message}>{message}</p>;
};

export default ErrorMessage;
