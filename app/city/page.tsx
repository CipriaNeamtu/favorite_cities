'use client'

import { Container, Badge, Box, Card, HStack, Image, Button, Flex } from "@chakra-ui/react"
import WindyMap from "@/app/components/WindyMap";
import { useEffect, useState } from "react";
import { CityType } from "../definitions";
import Loading from "../components/Loading";

const Page = () => {
	const [city, setCity] = useState<CityType | null>(null);
	const defaulCity = { name: 'Brasov', latitude: 45.64861, longitude: 25.60613 };
	const unplashApiKey = process.env.NEXT_PUBLIC_UNPLASH_ACCESS_KEY;

	const getCityData = async () => {
		const response = await fetch('/api/saveCity');
		const { selectedCity } = await response.json();

		selectedCity.imageUrl = await getCityImage(selectedCity.name);

		if (selectedCity) {
			setCity(selectedCity)
		} else {
			setCity(defaulCity);
		}
	}

	const addCityToFavoritesPage = async () => {
		await fetch('/api/manageCity', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(city),
		});
	}

	const getCityImage = async (city: string) => {
		try {
			const photoResponse = await fetch(`https://api.unsplash.com/search/photos?query=${city}&per_page=1&client_id=${unplashApiKey}`);
			const { results } = await photoResponse.json();
			return results[0]?.urls?.regular;
		} catch (error) {
				console.error('Page::city::getCityImage', error)
		}
	}

	useEffect(() => {
		getCityData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!city) return <Loading />

	return (
		<Container display={'flex'} flexDir={'column'} gap={'10'}>
			<Card.Root flexDirection="row" overflow="hidden" maxW="xl">
				<Image
					objectFit="cover"
					maxW="200px"
					src={city.imageUrl ?? undefined}
					alt="Caffe Latte"
				/>
				<Box>
					<Card.Body>
						<Card.Title mb="2">{city.name}</Card.Title>
						<Card.Description>
							<Flex flexDirection={'column'} gap={'2'}>
								<Box>Country: {city.country}</Box>
								<Box>Population: {city.population}</Box>
							</Flex>
						</Card.Description>
						<HStack mt="4">
							<Badge>Latitude: {city.latitude}</Badge>
							<Badge>Longitude: {city.longitude}</Badge>
						</HStack>
					</Card.Body>
					<Card.Footer>
						<Button variant={'outline'} colorPalette={'blue'} onClick={addCityToFavoritesPage}>Add to Favorites</Button>
					</Card.Footer>
				</Box>
			</Card.Root>

			<WindyMap cityData={city} />
		</Container>
	)
}

export default Page;