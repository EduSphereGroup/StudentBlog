import { Profile } from "@/entities/profile.entity";
import { User } from "@/entities/user.entity";
import { UserRepository } from "@/repositories/user.repository";
import { CreateUserUseCase } from "@/use-cases/create-user";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
    profileId: z.nativeEnum(Profile),
    name: z.string(),
    email: z.string(),
  });

  try {
    const { username, password, profileId, name, email } =
      registerBodySchema.parse(req.body);

    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const user = await createUserUseCase.handler({
      username,
      password,
      profileId,
      name,
      email,
    });

    return res.status(201).send(user);
  } catch (error) {
    console.error(`Error creating user: ${error}`);

    if (error instanceof z.ZodError) {
      res.status(400).json({
        message:
          "Validation failed at creating user, check the data format and try again",
        errors: error.errors,
      });

      res.status(500).json({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
