// http://localhost:4000/products
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

export default function Products() {
  let [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/products`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const onDeleteProduct = (id) =>{
    setLoading(true);
    fetch(`http://localhost:4000/products/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-type': 'application/json'
      }
    })
      .then(response => {
        if(!response.ok)
          throw new Error('Network response was not ok');
        return response.json()
      })
      .then(data => {
        console.log(data);
        setProducts(products.filter(p => p._id != id));
        alert("Deleted Successfully!")
      }).catch(err => alert("Error: " + err.message))
      .finally(() => setLoading(false))
  }

  const onUpdateProduct = (id) => {

  }


  if (loading) return <h1> Loading ...</h1>;

  return (
    <div>
      <h1> List of Products </h1>
      <hr />
      <ol>
      {products.map(product => (
        <li key={product._id}> 
          <Link to={`/products/${product._id}`}> {product.title} </Link>
          <button className='btn btn-sm btn-outline-danger' onClick={() => onDeleteProduct(product._id)}> delete </button>
          <Link to={`/update-product/${product._id}`}> update </Link>
        </li>)
      )}
      </ol>
    </div>
  );
}