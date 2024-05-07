import Layout from '../../components/Layout/Layout';
import TrelloImport from '../../components/Trello/TrelloImport/TrelloImport';
import TrelloAuth from '../../components/Trello/TrelloAuth/TrelloAuth';
import trello from '../../assets/icons/trello.svg';
const ImportDataPage = () => {
    return (
        <Layout>
            <h1>Импорт данных</h1>
            <img src={trello} width={'40px'} />
            <TrelloAuth />
            <TrelloImport />
        </Layout>
    );
};

export default ImportDataPage;
