import React, { useState } from "react";
import Card from '../components/Cards'

function Recherche() {

    const [searchText,setSearchText] = useState('')
    const [items, setItems] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    const SearchInDatabase = (e) => {
        e.preventDefault()
        fetch('https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-/records?search='+searchText+'&sort=title&rows=15')
        .then((res) => res.json())
        .then((data) => {setItems(data.records)}
        );
    }

    return (
        <div>
            <h1>Rechercher un événement</h1>
            <div className="search">
                <form onSubmit={SearchInDatabase}>
                    <input type="text" onChange={e => setSearchText(e.target.value)} />
                    <button type='submit'>Rechercher</button>
                </form>
            </div>

            <h2>Evenements :</h2>
            <div className="row-card">
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
                ))}
                {items.length === 0 && (
                    <p>Aucun évenements ne correspond à votre recherche dans la base</p>
                )}
            </div>
        </div>
    )
}

export default Recherche;
