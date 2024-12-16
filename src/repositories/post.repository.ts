import { Post } from "@/entities/post.entity";

export class PostRepository {
  async create(post: Post): Promise<Post> {
    return post;
  }
}
