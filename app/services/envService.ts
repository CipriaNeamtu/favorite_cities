'use server'

const windyApiKey = process.env.WINDY_API_KEY;

export const getApiKey = async (key: string) => {
	switch(key) {
		case 'windyMap':
		return windyApiKey;

		default:
			return 'Unknown api key!'
	}
}