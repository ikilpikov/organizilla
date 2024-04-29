import ProgressBar from "../../UI/ProgressBar/ProgressBar";
import trello from "../../../assets/icons/trello.svg";

const TrelloModalImport = () => {
  console.log("modal");

  return (
    <div>
      <img src={trello} width={"40px"} />
      <h2>Импорт данных</h2>
      <p>Подожите немного процесс загрузки может занять некоторое время</p>
      <ProgressBar />
    </div>
  );
};

export default TrelloModalImport;
