import { signIn } from "@/app/auth";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	try {
		await signIn("credentials", { email, password, redirect: false, /* callbackUrl: '/' */ });
		return new Response(JSON.stringify({ message: "User Logged In." }), { status: 200 });
	} catch (error) {
		console.error('api::auth::login::signIn:', error)
		return new Response(JSON.stringify({ message: "Something went wrong!", error }), { status: 500 });
	}
} 