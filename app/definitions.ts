export type User = {
	id: string;
	name: string | null;	
	email: string;	
	password?: string;	
	emailVerified: boolean | null;	
	image: string | null;	
	role: string | null;
}

export type DialogType = {
	title: string;
	text: string;
	open: boolean;
	onOpenChange: () => void;
	onSave: () => void;
	placement?: 'center' | 'top' | 'bottom';
	cancelButton?: string;
}

export type CityType = {
	admin1?: string;
	admin1_id?: number;
	admin2?: string;
	admin2_id?: number;
	country?: string;
	country_code?: string;
	country_id?: number;
	elevation?: number;
	feature_code?: string;
	id?: string;
	latitude?: number;
	longitude?: number;
	name?: string;
	population?: number;
	timezone?: string;
	imageUrl?: string;
}

export type WindyMapTypes = {
	cityData: CityType;
}