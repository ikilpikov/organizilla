import CreateBoard from '../../components/CreateBoard/CreateBoard';
import styles from './CreateNewBoardPage.module.scss';
const CreateNewBoardPage = () => {
    return (
        <div className={styles.createNewBoard}>
            <CreateBoard />
        </div>
    );
};

export default CreateNewBoardPage;
