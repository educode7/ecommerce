export interface ProductDto {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: RatingDto;
  title: string;
  qty: number;
  subTotal: number;
}

export interface RatingDto {
  count: number;
  rate: number;
}
