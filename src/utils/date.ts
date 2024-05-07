import { capitalizeFirstLetter } from './utils';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.locale('ru'); // Устанавливаем локаль на русский язык
dayjs.extend(localizedFormat);
const date = dayjs();

export const getCurrentDate = () => {
    const dayOfWeek = capitalizeFirstLetter(date.format('dddd'));
    //реализуется так,так как данный подход предоставляет автоматическое склонение месяца
    const dayAndMonth = date.format('D MMMM');
    const [day, month] = dayAndMonth.split(' ');
    return `${dayOfWeek}, ${day} ${capitalizeFirstLetter(month)} `;
};
export const getGreeting = () => {
    if (date.hour() >= 6 && date.hour() < 12) return 'Доброе утро';
    else if (date.hour() >= 12 && date.hour() < 18) return 'Добрый день';
    else return 'Добрый вечер';
};
