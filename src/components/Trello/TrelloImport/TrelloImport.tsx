import { useEffect, useState } from "react";
import CustomSelect from "../../UI/CustomSelect/CustomSelect";
import TrelloModalImport from "../TrelloModalImport/TrelloModalImport";
import useTrelloBoards from "../../../hooks/useTrelloBoards";
import { ITrelloBoard } from "../../../types/trelloBoardTypes";
import { getSelectedData } from "../../../services/trelloAPI";
const TrelloImport = () => {
  const [tokenValue, setTokenValue] = useState("");
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [boardsData, setBoardsData] = useState<ITrelloBoard[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { data, refetch, isError } = useTrelloBoards(tokenValue);

  const options = boardsData?.map((element: ITrelloBoard) => ({
    value: element.id,
    label: element.name,
  }));

  const getAllBoards = () => {
    tokenValue !== "" && refetch();
  };

  useEffect(() => {
    if (data) {
      setBoardsData(
        data.data.map((item: any) => {
          return { id: item.id, name: item.name };
        })
      );
    }
  }, [data]);

  const importData = () => {
    setModalIsVisible(true);
    getSelectedData({ tokenValue, boards: selectedOptions });
  };

  return (
    <div>
      <input
        placeholder="Введите токен"
        onBlur={getAllBoards}
        value={tokenValue}
        onChange={(event) => setTokenValue(event.target.value)}
      />
      {isError && <p>Неверный токен</p>}
      <h3>Шаг 2. Выбор досок для импорта</h3>
      <CustomSelect
        options={tokenValue ? options : []}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <button onClick={importData} disabled={!(selectedOptions.length > 0)}>
        Импортировать данные
      </button>
      {modalIsVisible && <TrelloModalImport />}
    </div>
  );
};

export default TrelloImport;
