// Types used throughout the application.
export interface GetGallerySearchRequest {
    query: string;
    sortOption?: SortOption;
    windowOption?: WindowOption;
    page?: number;
}

export interface GetGallerySearchResponse {
    images: GalleryImage[];
    errorMessage?: string;
}

export interface GalleryImage {
    link: string;
    title: string;
}

export interface REQUEST_OPTIONS {
    method: HttpMethods
    headers: Headers
}

// TODO: Look into using enums instead and replace hardcoded references to the values.
export type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PATCH'

export type SortOption  = 
    'time' | 'viral' | 'top';

export type WindowOption = 'day' | 'week' | 'month' | 'year' | 'all';