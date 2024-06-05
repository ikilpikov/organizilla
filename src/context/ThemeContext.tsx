import React, { FC, createContext } from 'react';
import { useTheme } from 'hooks/useTheme';

interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface IThemeProviderProps {
    children: React.ReactNode;
}
export const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
    const { theme, setTheme } = useTheme();

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
