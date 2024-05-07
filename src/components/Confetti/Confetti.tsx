import ReactConfetti from 'react-confetti';
import { useState, useEffect } from 'react';
const Confetti = () => {
    const [windowDimesion, setWindowDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const detectSize = () => {
        setWindowDimension({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };
    useEffect(() => {
        window.addEventListener('resize', detectSize);
        return () => {
            window.removeEventListener('resize', detectSize);
        };
    }, [windowDimesion]);

    return (
        <ReactConfetti
            width={windowDimesion.width}
            height={windowDimesion.height}
            tweenDuration={100}
            numberOfPieces={400}
        />
    );
};

export default Confetti;
