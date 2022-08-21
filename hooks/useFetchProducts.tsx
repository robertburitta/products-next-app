import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Result } from '../types/Result';

interface useFetchProductsProps {
	limit?: number;
}

export const useFetchProducts = ({ limit = 5 }: useFetchProductsProps) => {
	const API_URL = 'https://dummyjson.com/products';
	const [result, setResult] = useState({} as Result);
	const [categories, setCategories] = useState([] as string[]);
	const [category, setCategory] = useState('');
	const [page, setPage] = useState(1);
	const [canLoadMore, setCanLoadMore] = useState(true);

	useEffect(() => {
		if (result.total) {
			if (page * limit === result.total) {
				setCanLoadMore(false);
			} else {
				setCanLoadMore(true);
			}
		}
	}, [result, page, limit]);

	const fetchData = (url: string) => {
		return new Promise(async (resolve, reject) => {
			try {
				await fetch(url).then(res => res.json()).then((data: Result) => {
					resolve(data);
				});
			} catch (err) {
				reject(new Error((err as Error).message));
			}
		});
	};

	const { isLoading: isLoadingProducts } = useQuery(['products', page, category], () => {
		if (category !== '') {
			return fetchData(`${API_URL}/category/${category}?skip=${(page - 1) * limit}&limit=${limit}`);
		} else {
			return fetchData(`${API_URL}?skip=${(page - 1) * limit}&limit=${limit}`);
		}
	}, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		onSuccess: (data) => {
			let resultData = data as Result;

			if (page === 1) {
				setResult(resultData);
			} else {
				setResult((prev) => {
					return {
						...resultData,
						products: prev.products ? [...prev.products, ...resultData.products] : resultData.products
					};
				});
			}
		},
		onError: (err) => {
			console.error(err);
		}
	});

	const loadMore = () => {
		setPage((prev) => prev + 1);
	};

	const searchByCategory = (category: string) => {
		setCategory(category);
		setPage(1);
	};

	const { isLoading: isLoadingCategories } = useQuery('categories', () => fetchData(`${API_URL}/categories`), {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		onSuccess: (data) => {
			setCategories(data as string[]);
		},
		onError: (err) => {
			console.error(err);
		}
	});

	return {
		result,
		isLoadingProducts,
		loadMore,
		canLoadMore,
		searchByCategory,
		categories,
		isLoadingCategories
	};
};