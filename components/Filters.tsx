import React, { useState } from 'react';
import { Box, Button, Select, Spinner, Stack } from '@chakra-ui/react';

interface FiltersProps {
	isLoadingCategories: boolean;
	categories: string[];
	searchByCategory: (category: string) => void;
	isLoadingBrands: boolean;
	brands: string[];
	searchByBrand: (brand: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({ isLoadingCategories, categories, searchByCategory, isLoadingBrands, brands, searchByBrand }) => {
	const [category, setCategory] = useState('');
	const [brand, setBrand] = useState('');

	const handleSearchByCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(event.target.value);
		searchByCategory(event.target.value);
		setBrand('');
		searchByBrand('');
	};

	const handleSearchByBrand = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setBrand(event.target.value);
		searchByBrand(event.target.value);
		setCategory('');
		searchByCategory('');
	};

	const resetFilters = () => {
		setCategory('');
		searchByCategory('');
		setBrand('');
		searchByBrand('');
	};

	return (
		<Box display="flex" flexDir="row" alignItems="center" justifyContent="space-between" mt="5">
			{isLoadingCategories ?
				<Spinner />
				:
				<Select placeholder="Select category" width="280px" m="0" value={category} onChange={handleSearchByCategory}>
					{categories?.map((category, index) =>
						<option key={index} value={category}>{category}</option>
					)}
				</Select>
			}
			{isLoadingBrands ?
				<Spinner />
				:
				<Select placeholder="Select brand" width="280px" m="0" value={brand} onChange={handleSearchByBrand}>
					{brands?.map((brand, index) =>
						<option key={index} value={brand}>{brand}</option>
					)}
				</Select>
			}
			<Button colorScheme="red" onClick={resetFilters}>Reset filters</Button>
		</Box>
	);
};