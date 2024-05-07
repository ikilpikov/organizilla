import Header from './Header/Header';
import SideMenu from './SideMenu/SideMenu';
import React, { FC } from 'react';
import styles from './Layout.module.scss';
import { useSideMenuVisibleStore } from '../../store';

interface ILayoutProps {
    children: React.ReactNode;
    fullWidth?: boolean;
}
const Layout: FC<ILayoutProps> = ({ children, fullWidth }) => {
    const sideMenuIsVisible = useSideMenuVisibleStore(state => state.sideMenuIsVisible);
    return (
        <div className={`${styles.layoutContainer} ${fullWidth ? styles.fullHeight : ''}`}>
            <Header />
            <div className={styles.mainContainer}>
                <SideMenu />
                <main className={`${styles.mainContent} ${!sideMenuIsVisible && styles.fullWidth}`}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
