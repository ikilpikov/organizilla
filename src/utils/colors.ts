import { COLOR_SHADES } from '../constants/colorShades';

export const getColor = (color: string): string => {
    // console.log(color);

    const [baseColor, shade] = color.split('_');
    const colorInfo = COLOR_SHADES[baseColor as keyof typeof COLOR_SHADES];

    if (!colorInfo) {
        throw new Error(`Color ${baseColor} is not defined`);
    }

    if (shade === 'dark') {
        return colorInfo.dark;
    } else if (shade === 'light') {
        return colorInfo.light;
    } else {
        return colorInfo.default;
    }
};
