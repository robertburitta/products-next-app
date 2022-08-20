import { Product } from './Product';

export interface Result {
	products: Product[];
	limit: number;
	skip: number;
	total: number;
}