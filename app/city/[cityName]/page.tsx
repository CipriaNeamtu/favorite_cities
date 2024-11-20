'use server'

import { Container } from "@chakra-ui/react"
import { CityParamsTypes } from "@/app/definitions";

const Page = async ({ params }: CityParamsTypes) => {
	console.log('%cCN', `font-weight: 900; background-color: #06856F; color: #FFFFFF; padding: 5px 15px; border-radius: 4px;`, ' ~ Page ~ params:', params)
	
	const cityName = params?.cityName;

	const citiesResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`);
	const { results } = await citiesResponse.json();

	const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${results[0].latitude}&longitude=${results[0].longitude}&hourly=temperature_2m,precipitation_probability,precipitation,rain&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset`);
	const data = await weatherResponse.json();
	console.log('%cCN', `font-weight: 900; background-color: #06856F; color: #FFFFFF; padding: 5px 15px; border-radius: 4px;`, ' ~ getData ~ data:', data)

	return (
		<Container>
			City Page
    </Container>
	)
}

export default Page;