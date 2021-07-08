export interface Price {
  meanPrice: number;
  medianPrice: number;
  minPrice: number;
  maxPrice: number;
}

export interface M2 {
  meanM2: number;
  medianM2: number;
  minM2: number;
  maxM2: number;
}

export interface PriceM2 {
  meanPriceM2: number;
  medianPriceM2: number;
  minPriceM2: number;
  maxPriceM2: number;
}

export interface Stats extends Price, M2, PriceM2 {
  items: number;
}

export interface Entry extends Stats {
  type: string;
  location: string;
  createdAt: number;
}

export interface GroupedEntry {
  items: number;
  meanPrice: number;
  meanPriceM2: number;
  createdAt: number;
}

export type ValueOf<T> = T[keyof T];
