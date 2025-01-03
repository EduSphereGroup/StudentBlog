import { PostRepository } from "@/repositories/post.repository";

export class FindPostByIdUseCase {
  constructor(private postRepository: PostRepository) {}

  handler(id: string) {
    return this.postRepository.findById(id);
  }
}
