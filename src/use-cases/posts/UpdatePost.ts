import PostRepositoryImpl from '../../infrastructure/repositories/PostRepositoryImpl';
import Post from '../../infrastructure/database/models/Post';

const postRepository = new PostRepositoryImpl();

export default async function updatePost(id: number, postData: Partial<Post>): Promise<Post | null> {
  return await postRepository.update(id, postData);
}