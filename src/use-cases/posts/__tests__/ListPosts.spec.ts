import listPosts from '../ListPosts';
import PostRepositoryImpl from '../../../infrastructure/repositories/PostRepositoryImpl';
import Post from '../../../infrastructure/database/models/Post';

jest.mock('../../../infrastructure/repositories/PostRepositoryImpl');

const postRepository = new PostRepositoryImpl();
const mockPosts = [
  { id: 1, title: 'Post 1', content: 'Content 1', author: 'Author 1' },
  { id: 2, title: 'Post 2', content: 'Content 2', author: 'Author 2' },
];
(postRepository.findAll as jest.Mock).mockImplementation(() => Promise.resolve(mockPosts));

describe('ListPosts Use Case', () => {
  it('should return all posts', async () => {
    const posts = await listPosts();

    expect(posts.length).toBe(2);
    expect(posts).toEqual(mockPosts);
    expect(postRepository.findAll).toHaveBeenCalledTimes(1);
  });
});