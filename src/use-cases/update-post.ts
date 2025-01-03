import { Post } from "@/entities/post.entity";
import { PostRepository } from "@/repositories/post.repository";

export class UpdatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  handler(id: string, post: Partial<Post>) {
    return this.postRepository.updatePost(id, post);
  }
}
