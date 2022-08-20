import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Result } from '../types/Result';

interface useFetchProductsProps {
	skip?: number;
	limit?: number;
}

export const useFetchProducts = ({ skip = 0, limit = 5 }: useFetchProductsProps) => {
	const [result, setResult] = useState({} as Result);
	const [page, setPage] = useState(1);
	const [canLoadMore, setCanLoadMore] = useState(true);
	const API_URL = 'https://dummyjson.com/products';

	useEffect(() => {
		if (result.total) {
			if (page * limit === result.total) {
				setCanLoadMore(false);
			}
		}
	}, [page]);

	const fetchProducts = () => {
		return new Promise(async (resolve, reject) => {
			try {
				await fetch(`${API_URL}?skip=${(page - 1) * limit}&limit=${limit}`)
					.then(res => res.json()).then((data: Result) => {
						resolve(data);
					});
			} catch (err) {
				reject(new Error((err as Error).message));
			}
		});
	};

	const { isLoading } = useQuery(['products', page], () => fetchProducts(), {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		onSuccess: (data) => {
			let resultData = data as Result;

			setResult((prev) => {
				return {
					...resultData,
					products: prev.products ? [...prev.products, ...resultData.products] : resultData.products
				};
			});
		},
		onError: (err) => {
			console.error(err);
		}
	});

	const loadMore = () => {
		setPage((prev) => prev + 1);
	};

	return {
		result,
		isLoading,
		loadMore,
		canLoadMore
	};
};