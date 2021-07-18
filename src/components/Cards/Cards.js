import React from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import LikeBtn from '../Btn/LikeBtn'
import "./Cards.css";

function Card(props) {

  const newDate = new Date(props.date)
  return (
    <Link to={"event/" + props.id}>
      <div className="card">
        <img className="card-image" src={props.img} alt={props.alt} />
        <div className="card-content">
          <div className="card-header">
            <h5 className="card-title">{props.title}</h5>
            <LikeBtn id={props.id}/>
          </div>
          <div className="card-date">
            <Moment date={newDate} format="DD/MM/YYYY [à] hh:mm"/>
          </div>
          <div className="card-text"
          dangerouslySetInnerHTML={{
            __html: props.description
        }}></div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
