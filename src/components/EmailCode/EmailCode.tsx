import { useEmailDataStore } from 'store';
import { useRef } from 'react';
import { isNotEmpty } from 'utils/helper';
import styles from './EmailCode.module.scss';

const EmailCode = () => {
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    const setEmailCode = useEmailDataStore(state => state.setEmailCode);

    const handleInput = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (!/^\d*$/.test(inputValue)) {
            event.currentTarget.value = '';
            event.preventDefault();
            return;
        }
        const allFilled = inputRefs.every(ref => isNotEmpty(ref));

        if (allFilled && inputRefs) {
            const emailCode = inputRefs.map(item => item.current?.value).join('');
            setEmailCode(emailCode);
        }
        if (index < inputRefs.length - 1 && inputRefs[index].current?.value && !allFilled) {
            const nextInputRef = inputRefs[index + 1].current;
            if (nextInputRef) {
                nextInputRef.value = '';
                nextInputRef.focus();
            }
        } else if (index === inputRefs.length - 1 || allFilled) {
            inputRefs[index].current?.blur();
        }
    };

    const handleFocus = (index: number) => {
        const inputValue = inputRefs[index].current;
        if (inputValue) inputValue.value = '';
        setEmailCode('');
    };

    return (
        <div className={styles.emailCode}>
            {inputRefs.map((ref, index) => (
                <input
                    key={index}
                    type="text"
                    ref={ref}
                    onChange={event => handleInput(index, event)}
                    onFocus={() => handleFocus(index)}
                />
            ))}
        </div>
    );
};

export default EmailCode;
