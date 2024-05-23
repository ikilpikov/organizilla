import React, { FC, useEffect, useRef, useState } from 'react';
import Header from './Header/Header';
import SideMenu from './SideMenu/SideMenu';
import styles from './Layout.module.scss';
import { useSideMenuVisibleStore } from '../../store';
import { ThemeProvider } from '../../context/ThemeContext';

interface ILayoutProps {
    children: React.ReactNode;
    fullWidth?: boolean;
}

const Layout: FC<ILayoutProps> = ({ children, fullWidth }) => {
    const sideMenuIsVisible = useSideMenuVisibleStore(state => state.sideMenuIsVisible);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState('100vh');
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const adjustHeight = () => {
            const hasHorizontalScrollbar = container.scrollWidth > container.clientWidth;
            setContainerHeight(hasHorizontalScrollbar ? 'calc(100vh - 17px)' : '100vh');
        };

        const resizeObserver = new ResizeObserver(adjustHeight);
        resizeObserver.observe(container);
        return () => {
            resizeObserver.disconnect();
        };
    }, [containerRef.current?.scrollWidth]);

    return (
        <ThemeProvider>
            <div
                className={`${styles.layoutContainer} ${fullWidth ? styles.fullHeight : ''}`}
                style={fullWidth ? { height: '100%' } : { height: containerHeight }}
                ref={containerRef}
            >
                <Header fullWidth={fullWidth} />
                <div className={styles.mainContainer}>
                    {!fullWidth && <SideMenu />}
                    <main
                        className={`${styles.mainContent} ${!sideMenuIsVisible ? styles.fullWidth : ''}`}
                    >
                        {children}
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Layout;
