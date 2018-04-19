export enum Privacy {
  Public = "public",
  Private = "private",
}

export interface IAccount {
  acct: string;
  avatar: string;
  avatar_static: string;
  created_at: string;
  display_name: string;
  followers_count: number;
  following_count: number;
  header: string;
  header_static: string;
  id: number;
  locked: boolean;
  note: string;
  source: {
    privacy: Privacy;
    sensitive: boolean;
    note: string;
  };
  statuses_count: number;
  url: string;
  username: string;
}
