import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LikeBtn from "../components/Btn/LikeBtn";

function Event() {
    const params = useParams();
    const id = params.id;
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${id}`)
        .then((res) => res.json())
        .then((data) => setEvent(data));
    }, [id]);

    return (
        <div className="container">
            {event && (
                <div>
                    <div className="eventHeader">    
                        <h1 className="title">{event.record.fields.title}</h1>
                        <LikeBtn id={params.id}/>
                    </div>
                    <div className="eventRow">
                        <div className="left">
                            <div className="eventImg">
                                <img
                                    src={event.record.fields.cover.url}
                                    alt={event.record.fields.cover_alt}
                                />
                            </div>
                        <p className="eventDescription">{event.record.fields.description.replace(/(<([^>]+)>)/gi, "")}</p>
                        </div>
                        <div className="right">
                            <div className="box">
                                <h3>Date</h3>
                                <p>{event.record.fields.date_description}</p>
                            </div>
                            
                            {event.record.fields.price_detail && (
                                <div className="box">
                                    <h3>Prix</h3>
                                    <p>{event.record.fields.price_detail}</p>
                                </div>
                            )}
                            <div className="box">
                                <h3>Adresse</h3>
                                <p>{event.record.fields.address_name}, {event.record.fields.address_street} {event.record.fields.address_zipcode}, {event.record.fields.address_city}</p>
                            </div>
                            <div className="box">
                                <h3>Transport</h3>
                                <p>{event.record.fields.transport}</p>
                            </div>
                            <div className="box contact">
                                <h3>Contact</h3>
                                <p>{event.record.fields.contact_name}</p>
                                <p>{event.record.fields.contact_mail}</p>
                                <p>{event.record.fields.contact_facebook}</p>
                                <p>{event.record.fields.contact_twitter}</p>
                                <p>{event.record.fields.contact_url}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    );
}

export default Event;
