import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import heartOutline from "../assets/heart-outline.png";
import heartFill from "../assets/heart-fill.png";

const idList = [];

function Event() {
    const params = useParams();
    const [event, setEvent] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const storedList = JSON.parse(localStorage.getItem("LikedEvents")) || [];
    useEffect(() => {
        fetch(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${params.id}`)
        .then((res) => res.json())
        .then((data) => setEvent(data));

        // check if the current event is already liked and in localStorage
        if (storedList.includes(params.id)) {
            setIsLiked(true);
        }
    }, [params.id]);

    const handleLike = (e) => {
        e.preventDefault();
        if (isLiked === false && !idList.includes(params.id)) {
            idList.push(params.id);
            localStorage.setItem("LikedEvents", JSON.stringify(idList));
            setIsLiked(true);
        } else {
            idList.splice(idList.indexOf(params.id), 1);
            storedList.splice(storedList.indexOf(params.id), 1);
            localStorage.setItem("LikedEvents", JSON.stringify(storedList));
            setIsLiked(false);
        }
    };

    return (
        <div className="container">
            {event && (
                <div>
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
                    <h1>{event.record.fields.title}</h1>
                    <div>
                        <img
                            src={event.record.fields.cover.url}
                            alt={event.record.fields.cover_alt}
                        />
                        <p>{event.record.fields.description}</p>
                    </div>
                    <p>{event.record.fields.date_description}</p>
                    <p>{event.record.fields.price_detail}</p>
                    <p>
                        {event.record.fields.address_name},
                        {event.record.fields.address_street}
                        {event.record.fields.address_zipcode},
                        {event.record.fields.address_city}
                    </p>
                    <p>{event.record.fields.transport}</p>
                    <p>{event.record.fields.contact_name}</p>
                    <p>{event.record.fields.contact_mail}</p>
                    <p>{event.record.fields.contact_facebook}</p>
                    <p>{event.record.fields.contact_twitter}</p>
                    <p>{event.record.fields.contact_url}</p>
                </div>
            )}
        </div>
    );
}

export default Event;
