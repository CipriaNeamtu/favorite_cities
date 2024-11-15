import { signIn } from "@/app/auth";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	try {
		const response = await signIn("credentials", { email, password });
		console.log('%cCN', `font-weight: 900; background-color: #06856F; color: #FFFFFF; padding: 5px 15px; border-radius: 4px;`, ' ~ logIn ~ response:', response)
		return new Response(JSON.stringify({ message: "User Logged In." }), { status: 200 });
	} catch (error) {
		console.error('api::login::signIn:', error)
		return new Response(JSON.stringify({ message: "Something went wrong!", error }), { status: 500 });
	}
} 