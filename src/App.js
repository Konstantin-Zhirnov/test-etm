import React from 'react';
import './App.css';
import Catalog from './Catalog/Catalog'
import Home from './Home/Home'
import Product from './Product/Product'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'




function App() {

  return (
    <Switch>
      <Route path="/catalog/:id" component={Product} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/" exact component={Home} />
      <Redirect to={'/'} />
    </Switch>
  );
}

export default withRouter(App)

