import React from 'react';
import './App.css';
import Catalog from './Catalog/Catalog'
import Home from './Home/Home'
import ProductContainer from './Product/ProductContainer'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'




function App() {

  return (
    <Switch>
      <Route path="/catalog/:id" component={ProductContainer} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/" exact component={Home} />
      <Redirect to={'/'} />
    </Switch>
  );
}

export default withRouter(App)

