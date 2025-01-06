import PostRepositoryImpl from '../../infrastructure/repositories/PostRepositoryImpl';
import Post from '../../infrastructure/database/models/Post';

const postRepository = new PostRepositoryImpl();

export default async function listPosts(): Promise<Post[]> {
  return await postRepository.findAll();
}