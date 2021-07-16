import React, { useState, useEffect } from "react";
import Card from '../components/Cards'

function Accueil() {

  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
    
  useEffect(() => {
    fetch("https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?sort=-date_start&limit=1")
    .then((res) => res.json())
    .then((data) => setItems(data.records),
    (error) => {setError(error)}
    );
  }, []);

  return (
    <div className="container">
      <h1 className="title">Bienvenue sur Paris Events</h1>
      <p>  L'application qui permet de rechercher en direct les prochains évenements Parisiens.</p>
      <div>
        <h2 className="title">Actualités</h2>
        <p className="centerText">Le dernier événement publié : </p>
        <div className="centerCard">
          {items.map((item, index) => ( 
              <Card key={index}
                  id={item.record.id}
                  title={item.record.fields.title}
                  img={item.record.fields.cover.url}
                  alt={item.record.fields.cover_alt}
                  date={item.record.fields.date_start}
                  description={item.record.fields.lead_text}
              />
              )
          )}
          {error && (
              <p>Aucun évenements dans la base</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Accueil;
