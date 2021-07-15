import React, { useState, useEffect } from "react";
import Card from '../components/Cards'

function Favoris() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        for ( var i = 0, len = localStorage.length; i < len; ++i ) {
            const test = localStorage.getItem(localStorage.key(i));
            fetch(`https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records/${test}`)
            .then((res) => res.json())
            .then((data) => setItems(items => [...items, data.record]));
        }
    }, []);

    return (
        <div className="container">
            <h2>Favoris :</h2>
            <div className="row-card">    
                    {items.map((item, index) => ( 
                        <Card key={index}
                            id={item.id}
                            title={item.fields.title}
                            img={item.fields.cover.url}
                            alt={item.fields.cover_alt}
                            date={item.fields.date_start}
                            description={item.fields.lead_text}
                        />
                    ))}
                    {items.length === 0 && (
                        <p>Aucun favoris enregistré</p>
                    )}
            </div>
        </div>
    );
}

export default Favoris;
