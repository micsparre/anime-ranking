export interface Anime {
    id: number;
    title: string;
}

export interface ThemeProps {
    light: boolean;
    setLight: React.Dispatch<React.SetStateAction<boolean>>;
}
