import {Switch, Route} from 'react-router-dom';
import Products from './products';
import Posts from './posts';
import Users from './users';
import Todos from './todos';
import Header from './header';
import Home from './home';
import NotFound from './NotFound';
import PostDetail from './post-detail';
import ProductDetail from './product-detail';
import AddProduct from './add-product';
import UpdateProduct from './update-product';

export default function App(){
  return(
    <div className='container'>
      <Header />
      <Switch>
      <Route exact path='/products'>
          <Products />
        </Route>
        <Route exact path='/products/:id'>
          <ProductDetail />
        </Route>
        <Route exact path="/add-product">
          <AddProduct />
        </Route>
        <Route exact path="/update-product/:id">
          <UpdateProduct />
        </Route>
        <Route exact path='/posts'>
          <Posts />
        </Route>
        <Route exact path='/posts/:id'>
          <PostDetail />
        </Route>
        <Route exact path='/todos'>
          <Todos />
        </Route>
        <Route exact path='/users'>
          <Users />
        </Route>
        <Route exact path='/'>
            <Home />
        </Route>
        <Route path='*'>
            <NotFound />
        </Route>
      </Switch>
    </div>
  )
}
