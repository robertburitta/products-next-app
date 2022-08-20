import { useState } from 'react';
import { useQuery } from 'react-query';
import { Result } from '../types/Result';

interface useFetchProductsProps {
	skip?: number;
	limit?: number;
}

export const useFetchProducts = ({ skip = 0, limit = 5 }: useFetchProductsProps) => {
	const [result, setResult] = useState({} as Result);
	const [page, setPage] = useState(1);
	const API_URL = 'https://dummyjson.com/products';

	const fetchProducts = () => {
		return new Promise(async (resolve, reject) => {
			try {
				await fetch(`${API_URL}?skip=${(page - 1) * limit}&limit=${limit}`)
					.then(res => res.json()).then((data: Result) => {
						console.log(data);
						resolve(data);
					});
			} catch (err) {
				reject(new Error((err as Error).message));
			}
		});
	};

	const { isLoading } = useQuery(['products', skip, limit], () => fetchProducts(), {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		onSuccess: (data) => {
			setResult(data as Result);
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
		loadMore
	};
};