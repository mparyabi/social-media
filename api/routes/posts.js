const router= require("express").Router();
const Post= require("../models/Post");
const User= require("../models/User");

//create a post
router.post("/",async (req,res)=>{
  try{  
    const newPost= new Post(req.body);
    const savedPost= await newPost.save();
    res.status(200).json(savedPost);}
    catch(error){
    res.status(500).json(error);
    }
});
//update a post
router.put("/:id/update",async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
    await post.updateOne({$set:req.body});
    res.status(200).send("you updated your post correctly")
    }
    else{
      res.status(403).send("you can update only your posts")
    }
  }
  catch(error){
    res.status(500).json(error);
  }
});
//delete a post
router.delete("/:id/delete",async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
    await post.deleteOne();
    res.status(200).send("you Deleted your post correctly")
    }
    else{
      res.status(403).send("you can Delete only your posts")
    }
  }
  catch(error){
    res.status(500).json(error);
  }
});
//like a post
router.put("/:id/like",async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){
    await post.updateOne({$push:{likes: req.body.userId}});
    res.status(200).send("you liked the post")
    }
    else{
      await post.updateOne({$pull:{likes: req.body.userId}});
      res.status(200).send("you disliked the post")
    }
  }
  catch(error){
    res.status(500).json(error);
  }
});
//get a post
router.get("/:id",async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  }
  catch(error){
    res.status(500).json(error);
  }
});
//get timeline posts
router.get("/timeline/:userId", async (req,res)=>{
  try{
const currentUser= await User.findById(req.params.userId);
const userPosts= await Post.find({userId:currentUser._id});
const friendPosts= await Promise.all(
currentUser.followings.map((friendId)=>{
    return Post.find({userId:friendId});
  })
);
res.status(200).json(userPosts.concat(...friendPosts))
}
catch(error){
  res.status(500).json(error);
}
});

//get user all posts
router.get("/profile/:username", async (req,res)=>{
  try{
const user= await User.findOne({username:req.params.username});
const userPosts= await Post.find({userId:user._id});
console.log(user);
res.status(200).json(userPosts)
}
catch(error){
  res.status(500).json(error);
}
});
module.exports=router;