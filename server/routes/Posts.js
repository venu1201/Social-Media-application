import express from 'express';
const router=express.Router();
import {  CreatePost, DeletePost, getPopularPosts, getPostbyId, getPosts, getPostsByQuery, getTopPosts, getTrendingTags, likeandcomment } from '../controllers/Postcontroller.js';

router.get('/:id',getPostbyId);
router.post('/:id',likeandcomment);
router.post('/upload/createpost',CreatePost);
router.get('/',getPosts);
router.delete('/:id',DeletePost);
router.get('/TopPosts/PostsbyLikes',getTopPosts);
router.get('/TopPosts/PostsbyPopular',getPopularPosts);
router.get('/PostsbyQuery/:query',getPostsByQuery);
router.get('/TopPosts/TrendingTags',getTrendingTags);
// router.get('/Post/:id',getPostById);
export default router;