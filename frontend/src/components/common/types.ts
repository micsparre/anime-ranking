export interface AnimeObject {
  title: string;
  id: number;
  episodes: number;
  start_date: string;
  end_date: string;
}

export interface RankingsObject extends AnimeObject {
  ranking: number;
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password?: string;
}

export interface UnsuccessfulResponse {
  message: string;
}

export interface SuccessfulUserResponse {
  token: string;
}
