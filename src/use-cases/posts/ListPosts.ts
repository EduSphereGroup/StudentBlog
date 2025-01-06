import PostRepositoryImpl from '../../infrastructure/repositories/PostRepositoryImpl';

const postRepository = new PostRepositoryImpl();

export default async function listPosts(): Promise<Post[]> {
  return await postRepository.findAll();
}