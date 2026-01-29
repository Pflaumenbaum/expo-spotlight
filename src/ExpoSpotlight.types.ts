import { NativeModule } from "expo";

export type SpotlightItemThumbnail = {
  // Base64-encoded image data (PNG/JPEG)
  base64?: string;

  // 	Image URL
  url?: string;

  // Image URL for dark theme
  darkUrl?: string;
};

export type SpotlightItemMetadata = {
  // Search keywords associated with the item
  keywords?: string[];

  // Content type of the item
  contentType?: string;

  // A number that indicates the relative importance of the item among other items from the app
  rankingHint?: number;

  // The copyright date of the item
  copyright?: string;

  // The URL associated with the media
  url?: string;

  // Geographic location data of the item
  location?: {
    latitude: number;
    longitude: number;
    namedLocation?: string;
    alatitude?: number;
  };
  // Creation timestamp (ms since epoch)
  createdAt?: number;

  // Last updated timestamp (ms since epoch)
  updatedAt?: number;

  // End timestamp (ms since epoch)
  endDate?: number;

  // Due timestamp (ms since epoch)
  dueDate?: number;

  // Timestamp when item was added to index (ms since epoch)
  addedDate?: number;

  // Start timestamp (ms since epoch)
  startDate?: number;
};

export type SpotlightItemTappedEvent = {
  // Id of the tapped Spotlight item.
  id: string;
};

export type SpotlightItem = {
  // Unique identifier for the item
  id: string;

  // Display title shown in Spotlight
  title: string;

  // Grouping identifier used to organize items by domain
  domainIdentifier: string;

  // Item description shown in Spotlight
  description?: string;

  // Thumbnail image that should be displayed instead of the app icon
  thumbnail?: SpotlightItemThumbnail;

  // Optional metadata that can improve search accuracy
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

