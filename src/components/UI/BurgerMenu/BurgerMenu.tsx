import { useSideMenuVisibleStore } from 'store';
import burgerMenu from 'assets/icons/burgerMenu.svg';
import styles from './BurgerMenu.module.scss';

const BurgerMenu = () => {
    const setSideMenuIsVisible = useSideMenuVisibleStore(state => state.setSideMenuIsVisible);

    return (
        <>
            <img
                src={burgerMenu}
                width={40}
                onClick={() => setSideMenuIsVisible()}
                className={styles.burgerMenu__icon}
            />
        </>
    );
};

export default BurgerMenu;
