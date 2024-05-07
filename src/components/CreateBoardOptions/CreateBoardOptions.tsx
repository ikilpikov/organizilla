import BlockOption from '../UI/BlockOption/BlockOption';
import styles from './CreateBoardOptions.module.scss';
import plus from '../../assets/icons/plus.svg';
import importImg from '../../assets/import.png';
import template from '../../assets/template.png';
const CreateBoardOptions = () => {
    return (
        <div className={styles.createBoardOptions}>
            <BlockOption text="Create new board" link="/create-board/blank" imageLink={plus} />
            <BlockOption text="Use a template" link="/create-board/template" imageLink={template} />
            <BlockOption text="Import board" link="/import" imageLink={importImg} />
        </div>
    );
};

export default CreateBoardOptions;
