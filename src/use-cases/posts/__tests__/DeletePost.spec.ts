import deletePost from '../DeletePost';
import PostRepositoryImpl from '../../../infrastructure/repositories/PostRepositoryImpl';

jest.mock('../../../infrastructure/repositories/PostRepositoryImpl');

const postRepository = new PostRepositoryImpl();
(postRepository.remove as jest.Mock).mockImplementation(id => Promise.resolve(true));

describe('DeletePost Use Case', () => {
  it('should delete a post', async () => {
    const result = await deletePost(1);

    expect(result).toBe(true);
    expect(postRepository.remove).toHaveBeenCalledTimes(1);
  });
});