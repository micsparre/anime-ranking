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
  username: string;
  token?: string;
  password?: string;
}

export interface UnsuccessfulResponse {
  message: string;
}

export interface SuccessfulUserResponse {
  token: string;
}
