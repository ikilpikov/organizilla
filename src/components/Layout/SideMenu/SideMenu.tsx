import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSideMenuVisibleStore } from '../../../store';
import styles from './SideMenu.module.scss';
import { FC } from 'react';

interface ISideMenuProps {
    fullWidth?: boolean;
}
const SideMenu: FC<ISideMenuProps> = ({ fullWidth }) => {
    const { t } = useTranslation();
    const sideMenuIsVisible = useSideMenuVisibleStore(state => state.sideMenuIsVisible);

    return (
        <aside
            className={`${styles.sideMenu} ${sideMenuIsVisible ? styles.sideMenu__visible : styles.sideMenu__hide}  ${fullWidth ? '' : styles.sideMenu__fullWidth}`}
        >
            <NavLink to={'/'} className={({ isActive }) => (isActive ? styles.active : '')}>
                {t('sideMenu.main')}
            </NavLink>
            <NavLink
                to={'/create-board'}
                className={({ isActive }) => (isActive ? styles.active : '')}
            >
                {t('sideMenu.create')}
            </NavLink>
            <NavLink to={'/pomodoro'} className={({ isActive }) => (isActive ? styles.active : '')}>
                {t('sideMenu.pomodoro')}
            </NavLink>
            <NavLink to={'/import'} className={({ isActive }) => (isActive ? styles.active : '')}>
                {t('sideMenu.import')}
            </NavLink>
            <NavLink to={'/settings'} className={({ isActive }) => (isActive ? styles.active : '')}>
                {t('sideMenu.settings')}
            </NavLink>
        </aside>
    );
};

export default SideMenu;
