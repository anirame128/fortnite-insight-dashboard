export interface FortniteMap {
  name: string;
  code: string;
  description: string;
  creator: string;
  tags: string[];
  maxPlayers: number;
  releaseDate: string;
  lastUpdate?: string;
}