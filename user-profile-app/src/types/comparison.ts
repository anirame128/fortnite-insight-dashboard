// user-profile-app/src/types/comparison.ts

export interface MapComparison {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  isPublic: boolean;
  tags: string[];
}

export interface MapComparisonVersion {
  id: string;
  comparisonId: string;
  version: number;
  title: string;
  description?: string;
  mapData: MapData;
  createdAt: Date;
  createdBy: string;
}

export interface MapData {
  center: [number, number]; // [lat, lng]
  zoom: number;
  bearing?: number;
  pitch?: number;
  style: MapStyle;
  layers: MapLayer[];
  annotations: MapAnnotation[];
}

export interface MapStyle {
  id: string;
  name: string;
  url: string;
  thumbnail?: string;
  isCustom: boolean;
}

export interface MapLayer {
  id: string;
  type: 'fill' | 'line' | 'symbol' | 'circle' | 'heatmap' | 'raster';
  source: string;
  'source-layer'?: string;
  layout?: Record<string, unknown>;
  paint?: Record<string, unknown>;
  filter?: unknown[];
  minzoom?: number;
  maxzoom?: number;
}

export interface MapAnnotation {
  id: string;
  type: 'point' | 'line' | 'polygon';
  geometry: GeoJSON.Geometry;
  properties: {
    title?: string;
    description?: string;
    color?: string;
    icon?: string;
    [key: string]: unknown;
  };
}

export interface ComparisonShare {
  id: string;
  comparisonId: string;
  shareToken: string;
  expiresAt?: Date;
  createdAt: Date;
  createdBy: string;
  accessLevel: 'view' | 'comment' | 'edit';
}

export interface ComparisonCollaborator {
  id: string;
  comparisonId: string;
  userId: string;
  email: string;
  role: 'viewer' | 'editor' | 'owner';
  invitedAt: Date;
  joinedAt?: Date;
  invitedBy: string;
}

export interface ComparisonComment {
  id: string;
  comparisonId: string;
  versionId?: string;
  parentId?: string;
  content: string;
  position?: {
    x: number;
    y: number;
  };
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
}

export interface ComparisonMetrics {
  comparisonId: string;
  viewCount: number;
  uniqueViewers: number;
  lastViewedAt?: Date;
  shareCount: number;
  exportCount: number;
}

export type ComparisonSortField = 'createdAt' | 'updatedAt' | 'title' | 'viewCount';
export type ComparisonSortOrder = 'asc' | 'desc';

export interface ComparisonFilters {
  userId?: string;
  isPublic?: boolean;
  tags?: string[];
  searchTerm?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface ComparisonListOptions {
  page: number;
  limit: number;
  sortField: ComparisonSortField;
  sortOrder: ComparisonSortOrder;
  filters: ComparisonFilters;
}

export interface ComparisonListResponse {
  comparisons: MapComparison[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}