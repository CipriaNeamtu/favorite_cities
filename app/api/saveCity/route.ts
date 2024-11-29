'use server'

import { CityType } from '@/app/definitions';

let selectedCity: CityType | null = null;

export async function POST(req: Request) {
	try {
		selectedCity = await req.json();
		return new Response(JSON.stringify({ message: 'City saved' }), { status: 200 });
	} catch (error) {
			console.error('api::saveCity:POST', error)
			return new Response(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
	}
}

export async function GET() {
	try {
		return new Response(JSON.stringify({ selectedCity }), { status: 200 })
	} catch (error) {
			console.error('api::saveCity:GET', error)
			return new Response(JSON.stringify({ message: 'Something went wrong!' }), { status: 405 })
	}
}
