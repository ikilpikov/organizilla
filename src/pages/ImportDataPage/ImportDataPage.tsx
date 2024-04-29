import TrelloImport from "../../components/Trello/TrelloImport/TrelloImport";
import TrelloAuth from "../../components/Trello/TrelloAuth/TrelloAuth";
import trello from "../../assets/icons/trello.svg";
const ImportDataPage = () => {
  return (
    <div>
      <h1>Импорт данных</h1>
      <img src={trello} width={"40px"} />
      <TrelloAuth />
      <TrelloImport />
    </div>
  );
};

export default ImportDataPage;
