export type Image = { 
  id: number;
  user: number; 
  image: string; 
  thumbnail: string; 
}

export type PaginatedResult<T> = {
  page: number; 
  pageSize: number;
  results: T[];
  total: number; 
}

export type ErrorResponse = {
  error: string;
  message: string;
  statusCode: number;
};

export interface IAd {
  city_name: string;
  created_at: string;
  description: string;
  district_name: string;
  id: number;
  images: Image[];
  price: number;
  title: string;
  user: number;
  views: number;
}

export type AdsFilterParams = {
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  city?: string;
  district?: string;
}
