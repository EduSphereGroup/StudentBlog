import createPost from '../CreatePost';
import PostRepositoryImpl from '../../../infrastructure/repositories/PostRepositoryImpl';

jest.mock('../../../infrastructure/repositories/PostRepositoryImpl');

const postRepository = new PostRepositoryImpl();
(postRepository.add as jest.Mock).mockImplementation(post => Promise.resolve({ id: 1, ...post }));

describe('CreatePost Use Case', () => {
  it('should create a new post', async () => {
    const newPost = { title: 'Test Title', content: 'Test Content', author: 'Test Author' };
    const createdPost = await createPost(newPost);
    
    expect(createdPost).toHaveProperty('id');
    expect(createdPost.title).toBe(newPost.title);
    expect(postRepository.add).toHaveBeenCalledTimes(1);
  });
});