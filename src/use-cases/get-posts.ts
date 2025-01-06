import { PostRepository } from "@/repositories/post.repository";

export class GetPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  handler() {
    return this.postRepository.get();
  }
}
