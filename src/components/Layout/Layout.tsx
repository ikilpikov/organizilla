import { useSideMenuVisibleStore } from 'store';
import React, { FC, useEffect, useRef, useState } from 'react';
import { ThemeProvider } from 'context/ThemeContext';
import Header from './Header/Header';
import styles from './Layout.module.scss';
import SideMenu from './SideMenu/SideMenu';

interface ILayoutProps {
    children: React.ReactNode;
    isView?: boolean;
}

const Layout: FC<ILayoutProps> = ({ children, isView }) => {
    const sideMenuIsVisible = useSideMenuVisibleStore(state => state.sideMenuIsVisible);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState('100vh');

    useEffect(() => {
        //логика изменения высоты доски в зависимости от появления нижнего скролла
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
                className={`${styles.layoutContainer} ${isView ? styles.isView : ''}`}
                style={isView ? { height: '100%' } : { height: containerHeight }}
                ref={containerRef}
            >
                <Header fullWidth={isView} />
                <div className={styles.mainContainer}>
                    {!isView && <SideMenu />}
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
