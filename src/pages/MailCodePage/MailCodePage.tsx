import { useNavigate } from "react-router-dom";
import EmailCode from "../../components/EmailCode/EmailCode";
import ResendCode from "../../components/ResendCode/ResendCode";
import leftArrow from "../../assets/icons/leftArrow.svg";
import styles from "./MailCodePage.module.scss";
import { useEmailData } from "../../store";
const MailCodePage = () => {
  const navigator = useNavigate();
  const emailCode = useEmailData((state) => state.emailCode);
  return (
    <div className={styles.mailCode}>
      <div className={styles.mailCode__header}>
        <img src={leftArrow} width={"40px"} onClick={() => navigator(-1)} />
        <h2>Введите код</h2>
      </div>
      <EmailCode />
      <button
        disabled={emailCode}
        className={`${styles.button} ${emailCode ? styles.active : ""}`}
      >
        Отправить код
      </button>
      <ResendCode />
    </div>
  );
};

export default MailCodePage;
