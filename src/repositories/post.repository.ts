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
      `INSERT INTO posts (title, sub_title, content, user_id, file) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, subTitle, content, userId, file],
    );
    return result?.rows[0];
  }

  async get(): Promise<Post[]> {
    const result =
      await database.clientInstance?.query<Post>(`SELECT * FROM posts`);

    return result?.rows ?? [];
  }
}
