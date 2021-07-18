import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LikeBtn from "../components/Btn/LikeBtn";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import fbIcon from '../assets/facebook.svg'
import twitterIcon from '../assets/twitter.svg'
import wwwIcon from '../assets/www.svg'
import emailIcon from '../assets/email.svg'
import phoneIcon from '../assets/phone.svg'

function Event() {
    const params = useParams();
    const id = params.id;
    const [event, setEvent] = useState(null);
    useEffect(() => {
        fetch(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setEvent(data)});
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
                        <p className="eventDescription"
                        dangerouslySetInnerHTML={{
                            __html: event.record.fields.description
                        }}></p>
                        </div>
                        <div className="right">
                            {event.record.fields.date_description && (
                                <div className="box">
                                    <h3>Date</h3>
                                    <p
                                    dangerouslySetInnerHTML={{
                                        __html: event.record.fields.date_description
                                    }}
                                    ></p>
                                </div>
                            )}
                            {event.record.fields.price_detail && (
                                <div className="box">
                                    <h3>Prix</h3>
                                    <p>{event.record.fields.price_detail}</p>
                                </div>
                            )}
                            {event.record.fields.address_name && (
                                <div className="box">
                                    <h3>Adresse</h3>
                                    <p>{event.record.fields.address_name}, {event.record.fields.address_street} {event.record.fields.address_zipcode}, {event.record.fields.address_city}</p>
                                </div>
                            )}
                            {event.record.fields.transport && (
                                <div className="box">
                                    <h3>Transport</h3>
                                    <p>{event.record.fields.transport}</p>
                                </div>
                            )}
                            <div className="box contact">
                                <h3>Contact</h3>
                                {event.record.fields.contact_name && (
                                    <p>{event.record.fields.contact_name}</p>
                                )}
                                {event.record.fields.contact_phone && (
                                    <p>{event.record.fields.contact_phone}</p>
                                )}
                                {event.record.fields.contact_mail && (
                                    <p>{event.record.fields.contact_mail}</p>
                                )}
                                <div className="contact-icon">
                                    {event.record.fields.contact_mail && (
                                        <a href={`mailto:${event.record.fields.contact_mail}`}>
                                            <img className="like-icon" src={emailIcon} alt="Logo" />
                                        </a>
                                    )}
                                    {event.record.fields.contact_phone && (
                                        <a href={`tel:${event.record.fields.contact_phone}`}>
                                            <img className="like-icon" src={phoneIcon} alt="Logo" />
                                        </a>
                                    )}
                                    {event.record.fields.contact_facebook && (
                                        <a href={event.record.fields.contact_facebook}>
                                            <img className="like-icon" src={fbIcon} alt="Logo" />
                                        </a>
                                    )}
                                    {event.record.fields.contact_twitter && (
                                        <a href={event.record.fields.contact_twitter}>
                                            <img className="like-icon" src={twitterIcon} alt="Logo" />
                                        </a>
                                    )}
                                    {event.record.fields.contact_url && (
                                        <a href={event.record.fields.contact_url}>
                                            <img className="like-icon" src={wwwIcon} alt="Logo" />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="box ">
                                <MapContainer 
                                    style={{height : '200px', width : '100%', marginBottom : '15px'}}
                                    center={[event.record.fields.lat_lon.lat, event.record.fields.lat_lon.lon]} 
                                    zoom={14} 
                                    scrollWheelZoom={false}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[event.record.fields.lat_lon.lat, event.record.fields.lat_lon.lon]}>
                                        <Popup>
                                            <p>{event.record.fields.address_name},<br />{event.record.fields.address_street},<br />{event.record.fields.address_zipcode} {event.record.fields.address_city}</p>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    );
}

export default Event;
