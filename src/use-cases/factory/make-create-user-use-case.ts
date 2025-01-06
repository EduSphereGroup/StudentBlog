import { UserRepository } from "@/repositories/user.repository";
import { CreateUserUseCase } from "../create-user";

export function makeCreateUserUseCase() {
  const userRepository = new UserRepository();
  const userCreateUseCase = new CreateUserUseCase(userRepository);
  return userCreateUseCase;
}
