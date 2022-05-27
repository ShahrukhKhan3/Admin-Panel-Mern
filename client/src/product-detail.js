// http://localhost:4000/products
import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';

export default function ProductDetail() {
  let {id} = useParams();
  let [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProduct(data);
        setLoading(false);
      }).catch(err => console.log('Error: ' + err.message));
  }, [id]);

  if (loading) return <h1> Loading ...</h1>;

  if(!product || !Object.keys(product).length)
    return <h1> Not post found for id {id}</h1>;

  return (
    <div>
      <h1> Product Detail Page </h1>
      <hr />
      <h1> ID {product._id} </h1>
      <h3> Title = {product.title}</h3>
      <h3> Price = {product.price}</h3>
      <h3> Status = {product.status ? "In Stock" : " Out of Stock"}</h3>
      <h3> Image Path = {product.image}</h3>
      <img src={"http://localhost:4000/" + product.image} />
    </div>
  );
}