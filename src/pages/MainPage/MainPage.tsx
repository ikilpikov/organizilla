import Layout from '../../components/Layout/Layout';
import CurrentDate from '../../components/CurrentDate/CurrentDate';
import SuccessRegister from '../../components/UI/Modals/SuccessRegister/SuccessRegisterModal';
import { useSuccessRegisterStore } from '../../store';
import WorkSpaces from '../../components/WorkSpaces/WorkSpaces';
import useAllBoards from '../../hooks/useAllBoards';
import { useEffect, useState } from 'react';
import { IBoards } from '../../components/WorkSpaces/WorkSpaces';
const MainPage = () => {
    const successRegisterVisible = useSuccessRegisterStore(state => state.successRegisterVisible);
    const [boards, setBoards] = useState<IBoards[]>([]);
    const { data, isSuccess } = useAllBoards();
    useEffect(() => {
        if (data) {
            console.log('uaa');
            setBoards(data.data);
        }
    }, [data]);

    return (
        <>
            <Layout>
                <CurrentDate />

                {isSuccess && (
                    <>
                        <div>Недавно просмотренные</div>
                        <WorkSpaces boards={boards} isRecent={true} />
                    </>
                )}
                {isSuccess && (
                    <>
                        <div>Ваши рабочие пространства</div>
                        <WorkSpaces boards={data?.data} isRecent={false} />
                    </>
                )}

                {successRegisterVisible && <SuccessRegister />}
            </Layout>
        </>
    );
};

export default MainPage;
