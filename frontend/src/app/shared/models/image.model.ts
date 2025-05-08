export interface Image {
    _id?: string;
    title: string;
    imageUrl: string;
    collection: string;
    description?: string;
    order?: number;
    createdAt?: Date;
  }