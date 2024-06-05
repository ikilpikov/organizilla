import { RefObject, useEffect } from 'react';

const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void, isOpen: boolean) => {
    const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            callback();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleClick);
            return () => {
                document.removeEventListener('click', handleClick);
            };
        }
    }, [isOpen]);
};

export default useClickOutside;
