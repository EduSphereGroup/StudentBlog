import { User } from "@/entities/user.entity";
import { database } from "@/lib/pg/db";

export class UserRepository {
  public async create({
    username,
    password,
    profileId,
    name,
    email,
  }: User): Promise<User | undefined> {
    const result = await database.clientInstance?.query<User>(
      `INSERT INTO "user" (username, password, profileId, name, email) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [username, password, profileId, name, email],
    );

    return result?.rows[0];
  }
}
