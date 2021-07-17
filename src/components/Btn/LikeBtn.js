import heartOutline from "../../assets/heart-outline.png";
import heartFill from "../../assets/heart-fill.png";
import React, { useState, useEffect } from "react";

const idList = JSON.parse(localStorage.getItem("LikedEvents")) || [];

function LikeBtn(props) {
    const [isLiked, setIsLiked] = useState(false);
    const id = props.id;

    useEffect(() => {
        if (idList.includes(id)) {
            setIsLiked(true);
        }
    }, [id]);
    
    const handleLike = (e) => {
        e.preventDefault();
        if (isLiked === false && !idList.includes(id)) {
          idList.push(id);
          localStorage.setItem("LikedEvents", JSON.stringify(idList));
          setIsLiked(true);
        } else {
          idList.splice(idList.indexOf(id), 1);
          localStorage.setItem("LikedEvents", JSON.stringify(idList));
          setIsLiked(false);
        }
    }
    return (
        <div>
            {isLiked ? (
              <button className="likeBtn" onClick={(e) => handleLike(e)}>
                <img className="card-like-icon" src={heartFill} alt="Logo" />
              </button>
            ) : (
              <button className="likeBtn" onClick={(e) => handleLike(e)}>
                <img className="card-like-icon empty" src={heartOutline} alt="Logo" />
              </button>
            )}
        </div>
    )
}

export default LikeBtn
