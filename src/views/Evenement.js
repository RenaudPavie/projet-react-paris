import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function Event() {

    const [event,setEvent] = useState(null)

    const params = useParams();
    const id = params.id;

    useEffect(() => {
        fetch("https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/"+id)
        .then((res) => res.json())
        .then((data) => {
            setEvent(data);
            console.log(data)
        }
        );
      }, []);
    

    return (
        <div>
            {event && 
                <h1>{event.record.fields.title}</h1>
            }
        </div>
    )
}

export default Event
