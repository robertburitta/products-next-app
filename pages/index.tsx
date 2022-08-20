import type { NextPage } from 'next';
import React from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';

const Home: NextPage = () => {
	const { result, isLoading } = useFetchProducts({});

	return (
		<React.Fragment>
			{isLoading ?
				'Loading...'
				:
				<React.Fragment>
					{result.products.map((product) =>
						<p key={product.id}>{product.title}</p>
					)}
				</React.Fragment>
			}
		</React.Fragment>
	);
};

export default Home;