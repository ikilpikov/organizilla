interface ColorInfo {
    backgroundColor: string;
    textColor: 'black' | 'white';
}

const COLOR_SHADES: Record<string, ColorInfo> = {
    yellow: { backgroundColor: '#FFFF00', textColor: 'black' },
    yellow_dark: { backgroundColor: '#CCCC00', textColor: 'black' },
    yellow_light: { backgroundColor: '#FFFF99', textColor: 'black' },
    red: { backgroundColor: '#FF0000', textColor: 'white' },
    red_dark: { backgroundColor: '#CC0000', textColor: 'white' },
    red_light: { backgroundColor: '#FF6666', textColor: 'black' },
    blue: { backgroundColor: '#0000FF', textColor: 'white' },
    blue_dark: { backgroundColor: '#0000CC', textColor: 'white' },
    blue_light: { backgroundColor: '#6666FF', textColor: 'white' },
    black: { backgroundColor: '#808080', textColor: 'white' },
    black_dark: { backgroundColor: '#000000', textColor: 'white' },
    black_light: { backgroundColor: '#A9A9A9', textColor: 'black' },
    lime: { backgroundColor: '#00FF00', textColor: 'black' },
    lime_dark: { backgroundColor: '#00CC00', textColor: 'black' },
    lime_light: { backgroundColor: '#99FF99', textColor: 'black' },
    orange: { backgroundColor: '#FFA500', textColor: 'black' },
    orange_dark: { backgroundColor: '#CC8400', textColor: 'white' },
    orange_light: { backgroundColor: '#FFB733', textColor: 'black' },
    pink: { backgroundColor: '#FFC0CB', textColor: 'black' },
    pink_dark: { backgroundColor: '#CC99A2', textColor: 'white' },
    pink_light: { backgroundColor: '#FFD6DB', textColor: 'black' },
    purple: { backgroundColor: '#800080', textColor: 'white' },
    purple_dark: { backgroundColor: '#660066', textColor: 'white' },
    purple_light: { backgroundColor: '#993399', textColor: 'white' },
    sky: { backgroundColor: '#87CEEB', textColor: 'black' },
    sky_dark: { backgroundColor: '#5CACC4', textColor: 'black' },
    sky_light: { backgroundColor: '#A9DDF0', textColor: 'black' },
    green: { backgroundColor: '#008000', textColor: 'white' },
    green_dark: { backgroundColor: '#006400', textColor: 'white' },
    green_light: { backgroundColor: '#7FFF00', textColor: 'black' },
};

export default COLOR_SHADES;
