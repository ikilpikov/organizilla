import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './SideMenuLink.module.scss';

interface ISideMenuProps {
    to: string;
    translationKey: string;
}
const SideMenuLink: FC<ISideMenuProps> = ({ to, translationKey }) => {
    const { t } = useTranslation();
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `${styles.menuLink} ${isActive ? styles.menuLink__active : ''}`
            }
        >
            {t(translationKey)}
        </NavLink>
    );
};
export default SideMenuLink;
