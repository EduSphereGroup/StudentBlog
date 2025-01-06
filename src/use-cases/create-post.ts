import { Post } from "@/entities/post.entity";
import { PostRepository } from "@/repositories/post.repository";

export class CreatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  handler(post: Post) {
    return this.postRepository.create(post);
  }
}
