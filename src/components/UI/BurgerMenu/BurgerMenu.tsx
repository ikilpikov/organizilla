import { useSideMenuVisibleStore } from '../../../store';
import burgerMenu from '../../../assets/icons/burgerMenu.svg';

const BurgerMenu = () => {
    const setSideMenuIsVisible = useSideMenuVisibleStore(state => state.setSideMenuIsVisible);

    return (
        <>
            <img src={burgerMenu} width={40} onClick={() => setSideMenuIsVisible()} />
        </>
    );
};

export default BurgerMenu;
