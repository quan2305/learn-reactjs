
import './App.css'
import React, {useEffect} from 'react';
import TodoFeature from './features/Todo';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import ProductFeature from './features/Product';
import { Route, Link, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import Header from './components/Header';
;
function App() {
    useEffect(() =>{
      const fetchProducts = async () => {
        const params = {
          _limit:10,
        };
        const productsList = await productApi.getAll(params);
        console.log(productsList)
      }

      fetchProducts();
    }, [])


  return (
   <div className="App">
     <Header/>
     
     <Switch>
      <Route path="/" component={CounterFeature} exact/>
      <Route path="/todos" component={TodoFeature} exact/>
      <Route path="/todos" component={TodoFeature}/>
      <Route path="/album" component={AlbumFeature}/>
      <Route path="/products" component={ProductFeature}/>


     </Switch>
   </div>
  );
}

export default App;
