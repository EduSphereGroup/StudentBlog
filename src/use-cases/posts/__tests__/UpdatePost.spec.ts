import updatePost from '../UpdatePost';
import PostRepositoryImpl from '../../../infrastructure/repositories/PostRepositoryImpl';

jest.mock('../../../infrastructure/repositories/PostRepositoryImpl');

const postRepository = new PostRepositoryImpl();
(postRepository.update as jest.Mock).mockImplementation((id, post) => Promise.resolve({ id, ...post }));

describe('UpdatePost Use Case', () => {
  it('should update an existing post', async () => {
    const updatedPostData = { title: 'Updated Title', content: 'Updated Content' };
    const updatedPost = await updatePost(1, updatedPostData);
    
    expect(updatedPost.title).toBe(updatedPostData.title);
    expect(postRepository.update).toHaveBeenCalledTimes(1);
  });
});