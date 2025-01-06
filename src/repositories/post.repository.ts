import { Post } from "@/entities/post.entity";
import { database } from "@/lib/pg/db";

export class PostRepository {
  async create({
    title,
    subTitle,
    content,
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

  async findById(id: string): Promise<Post | null> {
    try {
      const result = await database.clientInstance?.query<Post>(
        `SELECT * FROM posts WHERE id = $1 LIMIT 1`,
        [id],
      );

      if (result && result.rows.length > 0) {
        return result.rows[0];
      }

      return null;
    } catch (error) {
      console.error("Erro ao buscar o post por ID:", error);
      throw new Error("Erro ao buscar o post por ID");
    }
  }

  async updatePost(
    id: string,
    updatedData: Partial<Post>,
  ): Promise<Post | void> {
    try {
      const post = await this.findById(id);
      if (!post) {
        throw new Error("Post not found");
      }

      const { title, subTitle, content, file } = updatedData;

      const result = await database.clientInstance?.query<Post>(
        `UPDATE posts SET title = COALESCE($1, title), sub_title = COALESCE($2, sub_title), content = COALESCE($3, content), file = COALESCE($4, file) WHERE id = $5 RETURNING *`,
        [
          title ?? post.title,
          subTitle ?? post.subTitle,
          content ?? post.content,
          file ?? post.file,
          id,
        ],
      );

      return result?.rows[0];
    } catch (error) {
      console.error("Error editing post:", error);
      throw new Error("Error editing post");
    }
  }
}
