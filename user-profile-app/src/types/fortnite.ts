```typescript
// Fortnite map search result types based on external research
// Represents a Fortnite Creative map entry from the discovery system

export interface FortniteMap {
  name: string;
  code: string;
  description: string;
  creator: string;
  tags: string[];
  maxPlayers: number;
  releaseDate: string;
  lastUpdate: string;
}

// Optional: helper type for map sorting/filtering
export type FortniteMapSortKey = keyof Pick<
  FortniteMap,
  'name' | 'releaseDate' | 'lastUpdate' | 'maxPlayers'
>;

// Optional: union of known tag strings (can be extended as needed)
export type FortniteMapTag =
  | 'Deathrun'
  | 'Zone Wars'
  | 'Box Fight'
  | '1v1'
  | 'FFA'
  | 'Adventure'
  | 'Horror'
  | 'Parkour'
  | 'Escape Room'
  | 'Tycoon'
  | 'Racing'
  | 'Music'
  | 'Roleplay'
  | 'Simulation'
  | 'Minigame'
  | 'Practice'
  | 'PvE'
  | 'PvP'
  | 'Creative'
  | 'Featured';
```