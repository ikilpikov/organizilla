import Layout from '../../components/Layout/Layout';
import CurrentDate from '../../components/CurrentDate/CurrentDate';
import SuccessRegister from '../../components/UI/Modals/SuccessRegister/SuccessRegisterModal';
import { useSuccessRegisterStore } from '../../store';
import WorkSpaces from '../../components/WorkSpaces/WorkSpaces';
const MainPage = () => {
    const successRegisterVisible = useSuccessRegisterStore(state => state.successRegisterVisible);
    return (
        <>
            <Layout>
                <CurrentDate />
                <div>Недавно просмотренные</div>
                <WorkSpaces />
                <div>Ваши рабочие пространства</div>
                <WorkSpaces />
                {successRegisterVisible && <SuccessRegister />}
            </Layout>
        </>
    );
};

export default MainPage;
