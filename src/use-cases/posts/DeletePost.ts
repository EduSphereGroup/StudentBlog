import PostRepositoryImpl from '../../infrastructure/repositories/PostRepositoryImpl';

const postRepository = new PostRepositoryImpl();

export default async function deletePost(id: number): Promise<boolean> {
  return await postRepository.remove(id);
}