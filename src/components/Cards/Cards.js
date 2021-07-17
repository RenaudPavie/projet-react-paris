import React from "react";
import { Link } from "react-router-dom";
import LikeBtn from '../Btn/LikeBtn'
import "./Cards.css";

function Card(props) {
  return (
    <Link to={"event/" + props.id}>
      <div className="card">
        <img className="card-image" src={props.img} alt={props.alt} />
        <div className="card-content">
          <div className="card-header">
            <h5 className="card-title">{props.title}</h5>
            <LikeBtn id={props.id}/>
          </div>
          <div className="card-date">{props.date}</div>
          <div className="card-text">{props.description.replace(/(<([^>]+)>)/gi, "")}</div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
