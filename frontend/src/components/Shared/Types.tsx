export interface Anime {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  episodes: number;
}

export interface AnimeListItem {
  id: number;
  title: string;
  ranking: number;
  start_date: string;
  end_date: string;
  episodes: number;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
}
