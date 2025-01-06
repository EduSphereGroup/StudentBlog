import PostRepositoryImpl from '../../infrastructure/repositories/PostRepositoryImpl';
import Post from '../../infrastructure/database/models/Post';

const postRepository = new PostRepositoryImpl();

export default async function createPost(postData: Partial<Post>): Promise<Post> {
  const post = { ...postData } as Post;
  return await postRepository.add(post);
}