import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IRegisterErrors {
    error: string;
    setError: (error: string) => void;
}

export const useRegisterErrorsStore = create<IRegisterErrors>(set => ({
    error: '',
    setError: (error: string) => {
        set(() => ({ error: error }));
    },
}));

interface IEmailData {
    email: string;
    emailCode: string;
    emailError: string;
    setEmail: (email: string) => void;
    setEmailCode: (code: string) => void;
    setEmailError: (error: string) => void;
}

export const useEmailDataStore = create(
    persist(
        set => ({
            email: '',
            emailCode: '',
            emailError: '',
            setEmailCode: (code: string) => {
                set(() => ({ emailCode: code }));
            },
            setEmail: (email: string) => {
                set(() => ({ email: email }));
            },
            setEmailError: (error: string) => {
                set(() => ({ emailError: error }));
            },
        }),
        {
            name: 'email-data',
            partialize: (state: IEmailData) => ({
                email: state.email,
            }),
        },
    ),
);

interface ISuccessRegister {
    successRegisterVisible: boolean;
    setSuccessRegisterVisible: (isVisible: boolean) => void;
}

export const useSuccessRegisterStore = create<ISuccessRegister>(set => ({
    successRegisterVisible: false,
    setSuccessRegisterVisible: (isVisible: boolean) => {
        set(() => ({ successRegisterVisible: isVisible }));
    },
}));

interface IJWTAccessToken {
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
}
export const useJWTAccessTokenStore = create<IJWTAccessToken>(set => ({
    accessToken: '',
    setAccessToken: (accessToken: string) => {
        set(() => ({ accessToken: accessToken }));
    },
}));

interface IImportModalVisible {
    importModalIsVisible: boolean;
    setImportModalIsVisible: (isVisible: boolean) => void;
}
export const useImportModalVisibleStore = create<IImportModalVisible>(set => ({
    importModalIsVisible: false,
    setImportModalIsVisible: (isVisible: boolean) => {
        set(() => ({ importModalIsVisible: isVisible }));
    },
}));

interface ISideMenuVisible {
    sideMenuIsVisible: boolean;
    setSideMenuIsVisible: () => void;
}

export const useSideMenuVisibleStore = create(
    persist(
        set => ({
            sideMenuIsVisible: true,
            setSideMenuIsVisible: () => {
                set((state: ISideMenuVisible) => ({ sideMenuIsVisible: !state.sideMenuIsVisible }));
            },
        }),
        {
            name: 'menu-is-visible',
            partialize: (state: ISideMenuVisible) => ({
                sideMenuIsVisible: state.sideMenuIsVisible,
            }),
        },
    ),
);

interface ISelectedBackround {
    regular: string;
    full: string;
}
interface IBackgroundImage {
    backgroundImagePageNumber: number;
    selectedBackground: ISelectedBackround;
    backgroundsIsLoading: boolean;
    setBackgroundsIsLoading: (isLoading: boolean) => void;
    setBackgroundImagePageNumber: (isStart?: boolean) => void;
    setSelectedBackground: (urls: string[]) => void;
    resetSelectedBackground: () => void;
}

export const useBackgroundImageStore = create<IBackgroundImage>(set => ({
    backgroundImagePageNumber: 1,
    selectedBackground: {
        regular:
            'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTgwNjF8MHwxfHNlYXJjaHwxfHxwaG90byUyMGJhY2tncm91bmR8ZW58MHwwfHx8MTcxNDk5MjE3MXww&ixlib=rb-4.0.3&q=80&w=700&quot;',
        full: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1OTgwNjF8MHwxfHNlYXJjaHwxfHxwaG90byUyMGJhY2tncm91bmR8ZW58MHwwfHx8MTcxNDk4NzA2N3ww&ixlib=rb-4.0.3&q=85',
    },
    backgroundsIsLoading: false,
    setBackgroundsIsLoading(isLoading) {
        set(() => ({ backgroundsIsLoading: isLoading }));
    },
    setBackgroundImagePageNumber: (isStart?: boolean) => {
        if (isStart) {
            set(() => ({ backgroundImagePageNumber: 1 }));
            return;
        } else {
            set(state => ({ backgroundImagePageNumber: state.backgroundImagePageNumber + 1 }));
        }
    },
    setSelectedBackground(urls: string[]) {
        if (urls.length === 2) {
            const newSelectedBackground = {
                regular: urls[0],
                full: urls[1],
            };
            set(() => ({ selectedBackground: newSelectedBackground }));
        }
    },
    resetSelectedBackground: () => {
        const defaultSelectedBackground = {
            regular:
                'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTgwNjF8MHwxfHNlYXJjaHwxfHxwaG90byUyMGJhY2tncm91bmR8ZW58MHwwfHx8MTcxNDk5MjE3MXww&ixlib=rb-4.0.3&q=80&w=700&quot;',
            full: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1OTgwNjF8MHwxfHNlYXJjaHwxfHxwaG90byUyMGJhY2tncm91bmR8ZW58MHwwfHx8MTcxNDk4NzA2N3ww&ixlib=rb-4.0.3&q=85',
        };
        set(() => ({ selectedBackground: defaultSelectedBackground }));
    },
}));

interface IShowActionStore {
    showListActions: number;
    showCardActions: number;
    showAddCard: number;
    setShowListActions: (id: number) => void;
    setShowCardActions: (id: number) => void;
    setShowAddCard: (id: number) => void;
}
export const useShowActionStore = create<IShowActionStore>((set, get) => ({
    showListActions: -1,
    showCardActions: -1,
    showAddCard: -1,
    setShowListActions: (id: number) => {
        if (get().showListActions === id) {
            set(() => ({ showListActions: -1 }));
        } else {
            set(() => ({ showListActions: id, showCardActions: -1, showAddCard: -1 }));
        }
    },
    setShowCardActions: (id: number) => {
        set(() => ({ showCardActions: id, showListActions: -1, showAddCard: -1 }));
    },
    setShowAddCard: (id: number) => {
        set(() => ({ showAddCard: id, showListActions: -1, showCardActions: -1 }));
    },
}));
