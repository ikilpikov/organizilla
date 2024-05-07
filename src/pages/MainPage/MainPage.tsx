import Layout from '../../components/Layout/Layout';
import CurrentDate from '../../components/CurrentDate/CurrentDate';
import SuccessRegister from '../../components/UI/Modals/SuccessRegister/SuccessRegisterModal';
import { useSuccessRegisterStore } from '../../store';
const MainPage = () => {
    const successRegisterVisible = useSuccessRegisterStore(state => state.successRegisterVisible);
    return (
        <>
            <Layout>
                <CurrentDate />
                <div>Недавно просмотренные</div>
                <div>Ваши рабочие пространства</div>
                {successRegisterVisible && <SuccessRegister />}
            </Layout>
        </>
    );
};

export default MainPage;
