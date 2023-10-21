export interface Anime {
  id: number;
  title: string;
}

export interface AnimeListItem {
  id: number;
  title: string;
  ranking: number;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
}
