'use server'

import { AppDataSource } from '@/app/data-source';
import { CityType } from '@/app/definitions';
import { FavoriteCities } from '@/app/entity/FavoriteCities';

let selectedCity: CityType | null = null;

export async function POST(req: Request) {
	try {
		selectedCity = await req.json();
		
		const city = {
			name: selectedCity?.name, 
			country: selectedCity?.country,
			population: selectedCity?.population,
			latitude: selectedCity?.latitude,
			longitude: selectedCity?.longitude,
			imageUrl: selectedCity?.imageUrl
		}

		if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

		const favoriteCitiesRepository = AppDataSource.getRepository(FavoriteCities);
		await favoriteCitiesRepository.save(city);

		return new Response(JSON.stringify({ message: 'City added!' }), { status: 200 });
	} catch (error) {
			console.error('api::manageCity:POST', error)
			return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
	}
}

export async function GET() {
	try {
		if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
		const favoriteCitiesRepository = AppDataSource.getRepository(FavoriteCities);
		const allCities = await favoriteCitiesRepository.find();

		return new Response(JSON.stringify({ allCities }), { status: 200 })
	} catch (error) {
			console.error('api::manageCity:GET', error)
			return new Response(JSON.stringify({ message: 'Something went wrong!' }), { status: 405 })
	}
}

export async function DELETE(req: Request) {
	try {
		selectedCity = await req.json();

		if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
		const favoriteCitiesRepository = AppDataSource.getRepository(FavoriteCities);
		await favoriteCitiesRepository.delete({ id: selectedCity?.id});

		return new Response(JSON.stringify({ message: `${selectedCity?.name} has been removed!` }), { status: 200 })
	} catch (error) {
			console.error('api::manageCity:GET', error)
			return new Response(JSON.stringify({ message: 'Something went wrong!' }), { status: 405 })
	}
}