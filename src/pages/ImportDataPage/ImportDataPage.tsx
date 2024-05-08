import Layout from '../../components/Layout/Layout';
import TrelloImport from '../../components/Trello/TrelloImport/TrelloImport';
import TrelloAuth from '../../components/Trello/TrelloAuth/TrelloAuth';
const ImportDataPage = () => {
    return (
        <Layout>
            <TrelloAuth />
            <TrelloImport />
        </Layout>
    );
};

export default ImportDataPage;
