import planet from '../../assets/icons/planet.svg';
import styles from './SelectLanguage.module.scss';
const SelectLangugage = () => {
    return (
        <>
            <h3>Planet</h3>
            <img src={planet} alt="planet" width={20} className={styles.selectLanguage__icon} />
        </>
    );
};

export default SelectLangugage;
