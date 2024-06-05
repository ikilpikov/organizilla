import { capitalizeFirstLetter } from './helper';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';
const date = dayjs();

export const getCurrentDate = () => {
    const locale = localStorage.getItem('locale');
    if (locale) dayjs.locale(locale);
    else dayjs.locale('ru'); // Устанавливаем локаль на русский язык
    dayjs.extend(localizedFormat);
    const date = dayjs();

    const dayOfWeek = capitalizeFirstLetter(date.format('dddd'));
    //реализуется так,так как данный подход предоставляет автоматическое склонение месяца
    const dayAndMonth = date.format('D MMMM');
    const [day, month] = dayAndMonth.split(' ');
    if (locale == 'en') return `${dayOfWeek}, ${capitalizeFirstLetter(month)} ${day}`;
    return `${dayOfWeek}, ${day} ${capitalizeFirstLetter(month)} `;
};

export const getGreeting = () => {
    if (date.hour() >= 6 && date.hour() < 12) return 'greeting.morning';
    else if (date.hour() >= 12 && date.hour() < 18) return 'greeting.afternoon';
    else return 'greeting.evening';
};
