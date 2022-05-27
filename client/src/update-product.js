import { useState, useEffect } from "react";
import {useParams, useHistory} from 'react-router-dom';

export default function UpdateProduct() {
  let {id} = useParams();
  let [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:4000/products/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProduct(data);
        setLoading(false);
      }).catch(err => console.log('Error: ' + err.message));
  }, [id]);

  const onSubmit = event => {
    event.preventDefault();
    console.log("state product", JSON.stringify(product));
    setLoading(true);

    fetch(`http://localhost:4000/products/${product._id}`, {
      method: "PUT",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(product)
    })
      .then(response => {
        if (!response.ok) throw new Error("Network Res Err ", response);
        return response.json();
      })
      .then(data => {
        console.log("server data", data);
        // alert("Updated on Server Successfully!");
        history.push('/products');
      })
      .catch(err => alert("Error: " + err.message))
      .finally(() => setLoading(false));
  };


  if (loading) return <h1> Loading ...</h1>;

  if(!product || !Object.keys(product).length)
    return <h1> Not post found for id {id}</h1>;

  return (
    <div className="pt-5">
      <form onSubmit={onSubmit}>
        <h2>Update Product</h2>
        <div className="mb-3">
          <label htmlhtmlFor="title1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title1"
            aria-describedby="emailHelp"
            required
            value={product.title}
            onChange={e => setProduct({ ...product, title: e.target.value })}
          />
          <div id="emailHelp" className="form-text">
            Your product name.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="price1" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price1"
            required
            value={product.price}
            onChange={e => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            checked={product.status}
            value={product.status}
            onChange={e => setProduct({ ...product, status: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Status
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Choose images to upload (PNG, JPG)
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept=".jpg, .jpeg, .png"
            // multiple
            onChange={e => setProduct({ ...product, image: e.target.files[0] })}
          />
        </div>
        {loading ? (
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Upload Product
          </button>
        )}
      </form>
    </div>
  );
}