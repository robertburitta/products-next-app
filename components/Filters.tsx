import React from 'react';
import { Box, Select, Spinner } from '@chakra-ui/react';

interface FiltersProps {
	isLoadingCategories: boolean;
	categories: string[];
	searchByCategory: (category: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({ isLoadingCategories, categories, searchByCategory }) => {
	return (
		<React.Fragment>
			{isLoadingCategories ?
				<Spinner />
				:
				<Select placeholder="Select category" width="300px" mt="5" onChange={(event) => searchByCategory(event.target.value)}>
					{categories?.map((category, index) =>
						<option key={index} value={category}>{category}</option>
					)}
				</Select>
			}
		</React.Fragment>
	);
};