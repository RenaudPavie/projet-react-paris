import heartOutline from "../assets/heart-outline.png";
import heartFill from "../assets/heart-fill.png";
import "./Cards.css";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <Link to={"event/"+props.id}>
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <h5 className="card-title">{props.title}</h5>
            <div className="card-date">{props.date}</div>
          </div>
        </div>
        <img className="card-image" src={props.img} alt={props.alt} />
        <div className="card-text">{props.description}</div>
        <div className="card-like-bar">
          {/* {props.liked ? (
            <img className="card-like-icon" src={heartFill} alt="Logo" />
          ) : (
            <img className="card-like-icon" src={heartOutline} alt="Logo" />
          )} */}
        </div>
      </div>
    </Link>
  );
}

export default Card;