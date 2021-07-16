import heartOutline from "../assets/heart-outline.png";
import heartFill from "../assets/heart-fill.png";
import "./Cards.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const idList = [];

function Card(props) {
  const [isLiked, setIsLiked] = useState(false);
  const id = props.id;
  
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("LikedEvents")) || [];
    if (storedList.includes(id)) {
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
      const newIdList = JSON.parse(localStorage.getItem("LikedEvents"));
      newIdList.splice(newIdList.indexOf(id), 1);
      localStorage.setItem("LikedEvents", JSON.stringify(newIdList));
      setIsLiked(false);
    }
  };

  return (
    <Link to={"event/" + props.id}>
      <div className="card">
        <img className="card-image" src={props.img} alt={props.alt} />
        <div className="card-content">
          <div className="card-header">
            <h5 className="card-title">{props.title}</h5>
            {isLiked ? (
              <button className="likeBtn" onClick={(e) => handleLike(e)}>
                <img className="card-like-icon" src={heartFill} alt="Logo" />
              </button>
            ) : (
              <button className="likeBtn" onClick={(e) => handleLike(e)}>
                <img
                  className="card-like-icon empty"
                  src={heartOutline}
                  alt="Logo"
                />
              </button>
            )}
          </div>
          <div className="card-date">{props.date}</div>
          <div className="card-text">{props.description.replace(/(<([^>]+)>)/gi, "")}</div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
