import PostRepositoryImpl from '../../infrastructure/repositories/PostRepositoryImpl';
import Post from '../../infrastructure/database/models/Post';

const postRepository = new PostRepositoryImpl();

export default async function getPostById(id: number): Promise<Post | null> {
  return await postRepository.findById(id);
}