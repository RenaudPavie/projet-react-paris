import React, { useState, useEffect } from "react";
import Card from '../components/Cards'

function Accueil() {

  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
    
  useEffect(() => {
    fetch("https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?sort=-date_start&limit=1")
    .then((res) => res.json())
    .then((data) => {
        setItems(data.records);
        console.log(data)
    },
    (error) => {setError(error)}
    );
  }, []);

  return (
    <div>
      <h1>Bienvenue sur Paris Events</h1>
      <p>
        L'application qui permet de rechercher en direct les prochains
        évenements Parisiens
      </p>
      <div>
        <h2>Actualités</h2>
        <p>Le dernier événement publié : </p>
        {items.map((item, index) => ( 
            <Card key={index}
                id={item.record.id}
                title={item.record.fields.title}
                img={item.record.fields.cover.url}
                alt={item.record.fields.cover_alt}
                date={item.record.fields.date_start}
                description={item.record.fields.lead_text}
                liked={isLiked}
            />
            )
        )}
        {error && (
            <p>Aucun évenements dans la base</p>
        )}
      </div>
    </div>
  );
}

export default Accueil;
