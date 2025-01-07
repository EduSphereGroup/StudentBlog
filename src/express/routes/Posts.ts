import { Router } from 'express';
import postController from '../../interfaces/controllers/PostController';

const router = Router();

router.get('/', postController.listPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.get('/search', postController.searchPosts);

export default router;