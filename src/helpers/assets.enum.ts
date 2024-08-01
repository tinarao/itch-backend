export enum Genres {
    PIXEL_ART = "Пиксель-арт",
    THREE_DIM = "3D",
    TWO_DIM = "2D",
}

export type AssetPixelSize = 512 | 256 | 128 | 64 | 32 | 16 | 8 | 4 | 2;

export enum AssetCategories {
    TileSet = "Тайлсеты",
    Character = "Персонажи",
    Environment = "Окружение",
    Animations = "Анимации",
    Background = "Фон",
    UI = "UI",
    Font = "Шрифт(-ы)"
}