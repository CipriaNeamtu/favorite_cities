import bcryptjs from "bcryptjs";
import { AppDataSource } from "@/app/data-source";
import { UserEntity } from "@/app/entity/Users";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    
    const userRepository = AppDataSource.getRepository(UserEntity);
    const existingUser = await userRepository.findOneBy({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "The user already exists." }), { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = userRepository.create({ email, password: hashedPassword });
    await userRepository.save(user);

    return new Response(JSON.stringify({ message: "User created." }), { status: 200 });
  } catch (error) {
    console.error("api::auth::register: Error creating user:", error);
    return new Response(JSON.stringify({ message: "Registration error", error }), { status: 500 });
  }
}
