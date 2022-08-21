import React from 'react';
import { Box, Divider, Image, Text } from '@chakra-ui/react';
import { Product } from '../types/Product';

interface CardProps {
	key: number;
	product: Product;
}

export const Card: React.FC<CardProps> = ({ product }) => {
	return (
		<Box display="flex" borderWidth="1px" borderRadius="lg" height="200" my="4" p="3">
			<Box width="40%" marginRight="4">
				<Image src={product.thumbnail} alt={product.title} width="auto" height="100%" borderRadius="lg" />
			</Box>
			<Box width="60%">
				<Text fontSize='xl'>{product.title}</Text>
				<Text fontSize='sm'>Category: {product.brand}</Text>
				<Divider my="2" />
				<Text fontSize='sm'>{product.description}</Text>
				<Text fontSize='2xl' mt="4">{product.price} $</Text>
			</Box>
		</Box>
	);
};