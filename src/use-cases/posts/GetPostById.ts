import PostRepositoryImpl from '../../infrastructure/repositories/PostRepositoryImpl';

const postRepository = new PostRepositoryImpl();

export default async function getPostById(id: number): Promise<Post | null> {
  return await postRepository.findById(id);
}