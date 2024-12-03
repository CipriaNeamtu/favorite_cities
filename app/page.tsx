'use client'

import { Button, Container, Flex, Heading, Image, Link, List, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "./context/Auth";
import Loading from "./components/Loading";
import { LuArrowRight, LuCheckCircle } from "react-icons/lu";
import { PAGE } from "./constants";

export default function Home() {
	const { isLoading } = useAuth()

	if (isLoading) return <Loading />

	return (
		<Container pb={'48'}>
			<Flex flexDir={'column'}>
				<Heading size={'xl'} alignSelf={'center'} mb={'10'}>Welcome to Favorite Cities Website</Heading>

				<Stack align="flex-start">
					<Heading size="2xl">Discover, organize, and share your list of dream destinations.</Heading>
					<Text mb="3" fontSize="md" color="fg.muted">
						Whether you`re a passionate traveler, an urban explorer, or just dreaming of your next getaway, this is where inspiration begins.
					</Text>

					<List.Root gap="2" variant="plain" align="center">
						<List.Item>
							<List.Indicator asChild color="green.500"><LuCheckCircle /></List.Indicator>
							Add your favorite cities - Create a personalized list of places that have captured your heart or are waiting to be explored.
						</List.Item>
						<List.Item>
							<List.Indicator asChild color="green.500"><LuCheckCircle /></List.Indicator>
							Discover new destinations - Get inspired by our recommendations or explore cities from around the globe.
						</List.Item>
						<List.Item>
							<List.Indicator asChild color="green.500"><LuCheckCircle /></List.Indicator>
							Customize your experience - Add descriptions, images, and notes for each city.
						</List.Item>
					</List.Root>

					<Text mt={'4'} fontSize="md" color="fg.muted">Your journey starts here!</Text>
					<Text mb={'2'} fontSize="md" color="fg.muted">Turn every destination into a memorable story. Add, explore, and get inspired!</Text>

					<Link href={PAGE.SEARCH} textDecoration="none" outline="none">
						<Button colorPalette={'blue'}>Search for a city <LuArrowRight /></Button>
					</Link>
				</Stack>
			</Flex>

			<Image src='cities.jpeg' alt='Favorite Cities' mt={'10'}></Image>
		</Container>
	);
}