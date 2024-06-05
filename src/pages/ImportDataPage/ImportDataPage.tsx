import Layout from 'components/Layout/Layout';
import TrelloAuth from 'components/Trello/TrelloAuth/TrelloAuth';
import TrelloImport from 'components/Trello/TrelloImport/TrelloImport';

const ImportDataPage = () => {
    return (
        <Layout>
            <TrelloAuth />
            <TrelloImport />
        </Layout>
    );
};

export default ImportDataPage;
