import './App.css'

import {BrowserRouter, Route, NavLink} from 'react-router-dom'

import Accueil from './views/Accueil'
import Recherche from './views/Recherche'
import Favoris from './views/Favoris'
import Evenement from './views/Evenement'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavLink to="/" activeClassName="selected" exact>Accueil</NavLink>
          <NavLink to="/recherche" activeClassName="selected">Recherche</NavLink>
          <NavLink to="/favoris" activeClassName="selected">Favoris</NavLink>
        </header>
        {/* Accueil */}
        <Route path="/" component={Accueil} exact />
        {/* Recherche */}
        <Route path="/recherche" component={Recherche} />
        {/* Favoris */}
        <Route path="/favoris" component={Favoris} />
        {/* Events */}
        <Route path="/event/:id" component={Evenement} />

      </div>
    </BrowserRouter>

  );
}

export default App;
