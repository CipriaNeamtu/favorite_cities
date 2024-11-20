'use server'

import { AppDataSource } from "../data-source";
import { UserEntity } from "../entity/Users";

export const getUserByEmailFromDataBase = async (email: string) => {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}
	const userRepository = AppDataSource.getRepository(UserEntity);

	try {
		const user = await userRepository.findOneBy({ email: email });

		if (!user) {
			return null;
		}

		return { 
			id: user?.id, 
			name: user?.name,
			email: user?.email,
			image: user?.image,
			role: user?.role,
			emailVerified: user?.emailVerified,
		};
	} catch (error) {
		console.error('userService::getUserByEmailFromDataBase:', error)
	}
}