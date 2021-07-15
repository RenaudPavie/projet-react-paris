import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function Event() {

    const params = useParams();
    const [event,setEvent] = useState(null)

    useEffect(() => {
        fetch(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${params.id}`)
        .then((res) => res.json())
        .then((data) => setEvent(data));
    }, [params.id]);
    
    return (
        <div className="container">
            {event && 
                <div>
                    <h1>{event.record.fields.title}</h1>
                    <div>
                        <img src={event.record.fields.cover.url} alt={event.record.fields.cover_alt} />
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
            }
        </div>
    )
}

export default Event
