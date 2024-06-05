import { useSideMenuVisibleStore } from 'store';
import { FC } from 'react';
import SideMenuLink from 'components/UI/SideMenuLink/SideMenuLink';
import styles from './SideMenu.module.scss';

interface ISideMenuProps {
    isView?: boolean;
}
const SideMenu: FC<ISideMenuProps> = ({ isView }) => {
    const sideMenuIsVisible = useSideMenuVisibleStore(state => state.sideMenuIsVisible);

    return (
        <aside
            className={`${styles.sideMenu} ${sideMenuIsVisible ? styles.sideMenu__visible : styles.sideMenu__hide}  ${isView ? '' : styles.sideMenu__isView}`}
        >
            <SideMenuLink to="/" translationKey="sideMenu.main" />
            <SideMenuLink to="/create-board" translationKey="sideMenu.create" />
            <SideMenuLink to="/pomodoro" translationKey="sideMenu.pomodoro" />
            <SideMenuLink to="/import" translationKey="sideMenu.import" />
            <SideMenuLink to="/settings" translationKey="sideMenu.settings" />
        </aside>
    );
};

export default SideMenu;
