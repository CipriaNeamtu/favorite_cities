import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs";
import { UserEntity } from "@/app/entity/Users";
import { AppDataSource } from "./data-source";

export const BASE_PATH = "/api/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
			},
			authorize: async (credentials) => {
				if (typeof credentials?.email != 'string' || typeof credentials?.password != 'string') {
					return null;
				}

				const { email, password } = credentials;

				if (!AppDataSource.isInitialized) {
					await AppDataSource.initialize();
				}
				const userRepository = AppDataSource.getRepository(UserEntity);

				const user = await userRepository.findOneBy({ email: email });
				console.log('%cCN', `font-weight: 900; background-color: #06856F; color: #FFFFFF; padding: 5px 15px; border-radius: 4px;`, ' ~ authorize: ~ user:', user)

				if (!user || !user?.password) {
					return null;
				}

				const isPasswordValid = await bcryptjs.compare(password, user.password);
				console.log('%cCN', `font-weight: 900; background-color: #06856F; color: #FFFFFF; padding: 5px 15px; border-radius: 4px;`, ' ~ authorize: ~ isPasswordValid:', isPasswordValid)

				if (!isPasswordValid) {
					return null; 
				}

				return user;
			},
		}),
	],
	// basePath: BASE_PATH,
})

