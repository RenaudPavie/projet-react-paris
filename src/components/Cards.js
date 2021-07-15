import heartOutline from "../assets/heart-outline.png";
import heartFill from "../assets/heart-fill.png";
import "./Cards.css";
import { Link } from "react-router-dom";
import {useState} from "react";


function Card(props) {

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    const id = props.id;

    if(isLiked === false) {

      localStorage.setItem(id , "liked")
      setIsLiked(true)
    } else {

      localStorage.removeItem(id)
      setIsLiked(false)
    }

  }

  return (
    <Link to={"event/"+props.id}>
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">{props.title}</h5>
          <div className="card-date">{props.date}</div>
        </div>
        <img className="card-image" src={props.img} alt={props.alt} />
        <div className="card-text">{props.description}</div>
        <div className="card-like-bar">
          {isLiked ? (
            <button onClick={e => handleLike(e)}>
              <img className="card-like-icon" src={heartFill} alt="Logo" />
            </button>
          ) : (
            <button onClick={e => handleLike(e)}>
              <img className="card-like-icon empty" src={heartOutline} alt="Logo" />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Card;