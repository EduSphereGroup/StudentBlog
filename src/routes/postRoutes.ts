import express from 'express';
const router = express.Router();
import {
  getPosts,
  getPost,
  addPost,
  editPost,
  removePost,
  search,
} from '../controllers/postController';
import { protect, authorize } from '../middleware/auth';

// Public routes
router.route('/')
  .get(getPosts);

router.route('/search')
  .get(search);

router.route('/:id')
  .get(getPost);

// Protected routes (Teachers only)
router.route('/')
  .post(protect, authorize('teacher'), addPost);

router.route('/:id')
  .put(protect, authorize('teacher'), editPost)
  .delete(protect, authorize('teacher'), removePost);

export default router;