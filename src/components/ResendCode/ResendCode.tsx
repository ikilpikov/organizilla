import { useEffect, useState } from "react";
import useSendConfirmationEmail from "../../hooks/useSendConfirmationEmail";
import { useEmailData } from "../../store";
import styles from "./ResendCode.module.scss";
const SendCode = () => {
  const [timer, setTimer] = useState(45);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const email = useEmailData((state) => state.email);
  const { mutate } = useSendConfirmationEmail();
  useEffect(() => {
    if (timer === 0) {
      setIsButtonDisabled(false);
    }
  }, [timer]);

  useEffect(() => {
    let intervalId: number;
    if (isButtonDisabled) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isButtonDisabled]);
  const handleResendCode = () => {
    mutate(email);
    setIsButtonDisabled(true);
    setTimer(5);
  };

  return (
    <button
      className={`${styles.resendCode} ${
        !isButtonDisabled ? styles.active : ""
      }`}
      disabled={isButtonDisabled}
      onClick={handleResendCode}
    >
      {isButtonDisabled
        ? `Не пришел код? Отправить повторно через ${timer} с`
        : "Отправить повторно"}
    </button>
  );
};

export default SendCode;
