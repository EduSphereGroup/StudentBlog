import Post from '../../infrastructure/database/models/Post';

export default interface PostRepository {
  add(post: Partial<Post>): Promise<Post>;
  findById(id: number): Promise<Post | null>;
  findAll(): Promise<Post[]>;
  update(id: number, post: Partial<Post>): Promise<Post | null>;
  remove(id: number): Promise<boolean>;
  search(keyword: string): Promise<Post[]>;
}