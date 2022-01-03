const User= require("../models/User");
const router= require("express").Router();
const bcrypt= require("bcrypt");

//Update User
router.put("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if (req.body.password){
            try{  
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            } catch(error){
               return res.status(500).json(error);
            }
    }
    try{
        
        const user= await User.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).json("account has been updated");
    }
    catch(error){
        return res.status(500).json(error);
    }}
    else{
        return res.status(403).json("You can Update only Your Account");
    }
    });
//Delete User
router.delete("/:id",async (req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
    try{
        const user= await User.findByIdAndDelete(req.params.id);
        res.status(200).json("account has been Deleted");
    }
    catch(error){
        return res.status(500).json(error);
    }}
    else{
        return res.status(403).json("You can Delete only Your Account");
    }
    });
//get a user
router.get("/",async (req,res)=>{
    const userId=req.query.userId;
    const username= req.query.username;
    try{
        const user= userId ?
        await User.findById(userId) :
        await User.findOne({username:username});
        const {password,updatedAt,...other} = user._doc
        res.status(200).json(other);
    }
    catch(error){
        return res.status(500).json(error);
    }}
    );
//follow a user
router.put("/:id/follow",async (req,res)=>{
    if(req.body.userId !== req.params.id){
    try{
        const user= await User.findById(req.params.id);
        const currentUser= await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId)){
        await user.updateOne({$push:{followers:req.body.userId}});
        await currentUser.updateOne({$push:{followings:req.params.id}})
        }
        else{
            res.status(403).json("You already follow this user");
        }
        res.status(200).json("follow is ok");
    }
    catch(error){
        return res.status(500).json(error);
    }}
    else{
        return res.status(403).json("You can not follow yourself!");
    }
    });

//unfollow a user

router.put("/:id/unfollow",async (req,res)=>{
    if(req.body.userId !== req.params.id){
    try{
        const user= await User.findById(req.params.id);
        const currentUser= await User.findById(req.body.userId);
        if(user.followers.includes(req.body.userId)){
        await user.updateOne({$pull:{followers:req.body.userId}});
        await currentUser.updateOne({$pull:{followings:req.params.id}})
        }
        else{
            res.status(403).json("that user is not your friend!");
        }
        res.status(200).json("Unfollow is ok");
    }
    catch(error){
        return res.status(500).json(error);
    }}
    else{
        return res.status(403).json("You can not Unfollow yourself!");
    }
    });

    //get friends
    router.get("/friends/:userId" , async (req,res) =>{
        try{
            const user= await User.findById(req.params.userId);
            const friends = await Promise.all(
                user.followings.map((friendId)=>{
                    return User.findById(friendId)
                })
            );
            let friendList=[];
            friends.map(friend=>{
                const {_id,username,profilePicture} = friend;
                friendList.push({_id,username,profilePicture});
            });
            res.status(200).json(friendList);
        }
        catch(error) {
            return res.status(500).json(error);
        }
    })

module.exports=router;