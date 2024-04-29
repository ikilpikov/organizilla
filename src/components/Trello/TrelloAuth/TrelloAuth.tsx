const TrelloAuth = () => {
  return (
    <>
      <h3>Шаг 1. Авторизация и получение токена</h3>
      <p>
        Для импорта данных Вам необходимо авторизоваться в Trello и получить
        токен доступа,который необходимо вставить в поле ниже
      </p>
      <a
        href="https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read&response_type=token&key=6929bf68afa629009200d0945bd97a53"
        target="_blank"
      >
        Авторизоваться в Trello
      </a>
    </>
  );
};

export default TrelloAuth;
