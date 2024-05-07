import { NavLink } from 'react-router-dom';
import { useSideMenuVisibleStore } from '../../../store';
import styles from './SideMenu.module.scss';
import { FC } from 'react';

interface ISideMenuProps {
    fullWidth?: boolean;
}
const SideMenu: FC<ISideMenuProps> = ({ fullWidth }) => {
    const sideMenuIsVisible = useSideMenuVisibleStore(state => state.sideMenuIsVisible);

    return (
        <aside
            className={`${styles.sideMenu} ${sideMenuIsVisible ? styles.sideMenu__visible : styles.sideMenu__hide} ${fullWidth ? styles.fullWidth : ''}`}
        >
            <NavLink to={'/'}>Главная</NavLink>
            <NavLink to={'/create-board'}>Create</NavLink>
            <p>Templates</p>
            <p>Проекты</p>
            <NavLink to={'/calendar'}>Calendar</NavLink>
            <NavLink to={'/pomodoro'}>Pomodoro</NavLink>
            <NavLink to={'/import'}>Import</NavLink>
            <NavLink to={'/settings'}>Settings</NavLink>
        </aside>
    );
};

export default SideMenu;
