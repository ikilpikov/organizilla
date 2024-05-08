import { FC } from 'react';
import Select, { MultiValue } from 'react-select';
import { useTranslation } from 'react-i18next';
import { IOptions } from '../../../types/basicTypes';

interface ICustomSelectProps {
    options: IOptions[];
    selectedOptions: string[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const CustomSelect: FC<ICustomSelectProps> = ({ options, selectedOptions, setSelectedOptions }) => {
    const { t } = useTranslation();
    const handleSelectAll = () => {
        const allOptionValues = options.map(option => option.value);
        setSelectedOptions(allOptionValues);
    };

    const handleOnChange = (newValue: MultiValue<IOptions>) => {
        setSelectedOptions(newValue ? (newValue as IOptions[]).map(option => option.value) : []);
    };
    return (
        <>
            <Select
                isDisabled={!options.length}
                options={options}
                isMulti
                onChange={handleOnChange}
                value={options.filter(option => selectedOptions.includes(option.value))}
            />
            <label>{t('import.selectAll')}</label>
            <input
                onClick={handleSelectAll}
                disabled={!options.length}
                type="checkbox"
                checked={selectedOptions.length == options.length && options.length > 0}
            />
        </>
    );
};

export default CustomSelect;
