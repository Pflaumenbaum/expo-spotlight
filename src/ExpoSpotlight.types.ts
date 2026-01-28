import { NativeModule } from "expo";

export type SpotlightItemThumbnail = {
  base64?: string;
  url?: string;
  darkUrl?: string;
};

export type SpotlightItemMetadata = {
  keywords?: string[];
  contentType?: string;
  rankingHint?: number;
  copyright?: string;
  url?: string;
  location?: {
    latitude: number;
    longitude: number;
    namedLocation?: string;
    alatitude?: number;
  };
  createdAt?: number;
  updatedAt?: number;
  endDate?: number;
  dueDate?: number;
  addedDate?: number;
  startDate?: number;
};

export type SpotlightItemTappedEvent = {
  id: string;
};

export type SpotlightItem = {
  id: string;
  title: string;
  domainIdentifier: string;
  description?: string;
  thumbnail?: SpotlightItemThumbnail;
  metadata?: SpotlightItemMetadata;
};

export type ExpoSpotlightEvents = {
  onSpotlightItemTapped: (event: SpotlightItemTappedEvent) => void;
};

export declare class ExpoSpotlightModule extends NativeModule<ExpoSpotlightEvents> {
  indexItems(items: SpotlightItem[]): Promise<void>;
  removeItem(id: string): Promise<void>;
  clearDomain(domainIdentifier: string): Promise<void>;
  clearAll(): Promise<void>;
};

