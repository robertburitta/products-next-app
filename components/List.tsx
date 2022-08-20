import React from 'react';
import { Result } from '../types/Result';
import { Card } from './Card';

interface ListProps {
	result: Result;
}

export const List: React.FC<ListProps> = ({ result }) => {
	return (
		<React.Fragment>
			{result?.products?.map((product) =>
				<Card key={product.id} product={product} />
			)}
		</React.Fragment>
	);
};