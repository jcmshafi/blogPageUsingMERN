const express = require('express');
const router = express.Router();

const{createBlog,getBlogs,getBlogById,updateBlog,deleteBlog} = require('../controller/BlogController');
const {register,login} = require('../controller/UserController');
const{requireSignin} = require('../middleware/auth');


router.post('/blogPost', createBlog);
router.get('/blogsGet',getBlogs);
router.get('/blogsGetID/:id', getBlogById);
router.post('/blogsUpdate/:id', updateBlog);
router.delete('/blogsDelete/:id', deleteBlog);


router.post ('/register', register);
router.post ('/login', login);




module.exports = router