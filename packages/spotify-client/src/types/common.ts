export interface Image {
  url: string;
  width?: number;
  height?: number;
}

export interface SharingInfo {
  shareId: string;
  shareUrl: string;
}

export interface PlayabilityStatus {
  playable: boolean;
  reason?: string;
}

export type BaseResponse<T> = {
  data: T;
}