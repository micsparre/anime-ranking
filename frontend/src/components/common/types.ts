export interface AnimeObject {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  episodes: number;
}

export interface UserAnimeObject {
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
