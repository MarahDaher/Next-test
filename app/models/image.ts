interface ImageMetadata {
  size: string;
  resolution: string;
}

export interface ImageModel {
  id: number;
  name: string;
  url: string;
  uploadDate: string;
  metadata: ImageMetadata;
  categoryId: number;
}
