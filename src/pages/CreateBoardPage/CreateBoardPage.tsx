import CreateBoardOptions from '../../components/CreateBoardOptions/CreateBoardOptions';
import Layout from '../../components/Layout/Layout';

const CreateBoardPage = () => {
    return (
        <>
            <Layout>
                <h1>Создание доски</h1>
                <CreateBoardOptions />
            </Layout>
        </>
    );
};

export default CreateBoardPage;
