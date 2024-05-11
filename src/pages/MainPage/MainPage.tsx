import Layout from '../../components/Layout/Layout';
import CurrentDate from '../../components/CurrentDate/CurrentDate';
import SuccessRegister from '../../components/UI/Modals/SuccessRegister/SuccessRegisterModal';
import { useSuccessRegisterStore } from '../../store';
import WorkSpaces from '../../components/WorkSpaces/WorkSpaces';
import useAllBoards from '../../hooks/useAllBoards';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IBoards } from '../../components/WorkSpaces/WorkSpaces';
const MainPage = () => {
    const { t } = useTranslation();
    const successRegisterVisible = useSuccessRegisterStore(state => state.successRegisterVisible);
    const [boards, setBoards] = useState<IBoards[]>([]);
    const { data, isSuccess } = useAllBoards();
    useEffect(() => {
        if (data) {
            console.log('uaa');
            setBoards(data.data);
        }
    }, [data]);
    console.log(data);

    return (
        <>
            <Layout>
                <CurrentDate />

                {isSuccess && boards.length > 0 && (
                    <>
                        <div>{t('main.recentBoard')}</div>
                        <WorkSpaces boards={boards} isRecent={true} />
                    </>
                )}
                {isSuccess && boards.length > 0 && (
                    <>
                        <div>{t('main.allBoards')}</div>
                        <WorkSpaces boards={data?.data} isRecent={false} />
                    </>
                )}

                {successRegisterVisible && <SuccessRegister />}
            </Layout>
        </>
    );
};

export default MainPage;
