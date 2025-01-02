import { Post } from "@/entities/post.entity";
import { database } from "@/lib/pg/db";

export class PostRepository {
  async create({
    id,
    title,
    subTitle,
    content,
    createdOn,
    userId,
    file,
  }: Post): Promise<Post | undefined> {
    const result = await database.clientInstance?.query<Post>(
      `INSER INTO "post" (id, title, subTitle, content, createdOn, userId, file) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [id, title, subTitle, content, createdOn, userId, file],
    );
    return result?.rows[0];
  }
}
