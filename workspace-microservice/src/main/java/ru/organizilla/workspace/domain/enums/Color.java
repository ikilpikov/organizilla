package ru.organizilla.workspace.domain.enums;

public enum Color {

    GREEN("green"),
    YELLOW("yellow"),
    ORANGE("orange"),
    RED("red"),
    PURPLE("purple"),
    BLUE("blue"),
    SKY("sky"),
    LIME("lime"),
    PINK("pink"),
    BLACK("black"),
    GREEN_DARK("green_dark"),
    YELLOW_DARK("yellow_dark"),
    ORANGE_DARK("orange_dark"),
    RED_DARK("red_dark"),
    PURPLE_DARK("purple_dark"),
    BLUE_DARK("blue_dark"),
    SKY_DARK("sky_dark"),
    LIME_DARK("lime_dark"),
    PINK_DARK("pink_dark"),
    BLACK_DARK("black_dark"),
    GREEN_LIGHT("green_light"),
    YELLOW_LIGHT("yellow_light"),
    ORANGE_LIGHT("orange_light"),
    RED_LIGHT("red_light"),
    PURPLE_LIGHT("purple_light"),
    BLUE_LIGHT("blue_light"),
    SKY_LIGHT("sky_light"),
    LIME_LIGHT("lime_light"),
    PINK_LIGHT("pink_light"),
    BLACK_LIGHT("black_light"),
    ;

    private final String colorValue;

    Color(String colorValue) {
        this.colorValue = colorValue;
    }

    public String getColorValue() {
        return colorValue;
    }

    public static Color fromString(String color) {
        for (Color labelColor : Color.values()) {
            if (labelColor.colorValue.equalsIgnoreCase(color)) {
                return labelColor;
            }
        }
        throw new IllegalArgumentException("No enum constant with color: " + color);
    }
}
