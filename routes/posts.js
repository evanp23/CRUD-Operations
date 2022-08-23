const express = require('express');
const router = express.Router();
const Post = require('../models/Post');



//GET ALL POSTS
router.get('/', async (req, res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json(err);
    }
});

//SUBMIT POST
router.post('/', async (req, res)=>{
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    
    try{
        const savedPost = await post.save()
        res.json(savedPost);
    }
    catch(err){
        res.json(err);
    }
});

//GET SPECIFIC POST
router.get('/:postId', async (req, res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json(err);
    }
});

//DELTE SPECIFIC POST
router.delete('/:postId', async (req, res)=>{
    try{
        const removedPost = await Post.deleteOne({_id: req.params.postId});
        res.json(removedPost);
        console.log("deleting: ", req.body)
    }catch(err){
        res.json(err);
    }
});

router.patch('/:postId', async (req, res)=>{
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set: {
                title: req.body.title,
                description: req.body.description
            }}
        );
        res.json(updatedPost);
    }catch(err){
        res.json(err);
    }
});

module.exports = router;