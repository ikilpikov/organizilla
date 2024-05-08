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
    console.log(fullWidth, 'sidemenu');

    return (
        <aside
            className={`${styles.sideMenu} ${sideMenuIsVisible ? styles.sideMenu__visible : styles.sideMenu__hide}  ${fullWidth ? '' : styles.sideMenu__fullWidth}`}
        >
            <NavLink to={'/'}>{t('sideMenu.main')}</NavLink>
            <NavLink to={'/create-board'}>{t('sideMenu.create')}</NavLink>
            <p>{t('sideMenu.templates')}</p>
            <p>{t('sideMenu.projects')}</p>
            <NavLink to={'/calendar'}>{t('sideMenu.calendar')}</NavLink>
            <NavLink to={'/pomodoro'}>{t('sideMenu.pomodoro')}</NavLink>
            <NavLink to={'/import'}>{t('sideMenu.import')}</NavLink>
            <NavLink to={'/settings'}>{t('sideMenu.settings')}</NavLink>
        </aside>
    );
};

export default SideMenu;
