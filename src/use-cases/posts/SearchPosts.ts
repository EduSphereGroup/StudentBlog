import PostRepositoryImpl from '../../infrastructure/repositories/PostRepositoryImpl';

const postRepository = new PostRepositoryImpl();

export default async function searchPosts(keyword: string): Promise<Post[]> {
  return await postRepository.search(keyword);
}