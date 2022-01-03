import './post.css';
import {MoreVert} from "@material-ui/icons";
import axios from "axios";
import { useState , useEffect , useContext} from 'react';
import {format} from "timeago.js";
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';


export default function Post({post}) {
    const {user:currentUser} = useContext(AuthContext);
    const [like,setLike] = useState(post.likes.length);
    const [islike,setIsLike]= useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;   
    
    useEffect(()=>{
    setIsLike(post.likes.includes(currentUser._id));
    },[currentUser._id,post.likes]);

    const [user,setUser] = useState([]);
    useEffect(() => {
        const fetchUser= async ()=>{
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
        }, [post.userId]);

        useEffect(()=>{},[])

    const likeHandler = () => {
       try{ axios.put("/posts/"+post._id+"/like",{userId:currentUser._id});}
       catch(error) {}
     setLike(!islike? like+1 : like-1);
     setIsLike(!islike);
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}><img className="postProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF+"no-avatar.png"} alt="" /></Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF+post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {/*<img className="likeIcon" style={{transform: "rotate(180deg)"}} src="/assets/like.png" alt="" />*/}
                        <img className="likeIcon" src="/assets/heart.png" alt="" onClick={likeHandler}/>
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
