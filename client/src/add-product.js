import React, { useState } from "react";

const INIT_PRODUCT = {
  title: "",
  price: "",
  status: false,
  image: ""
};

export default function AddProduct() {
  const [product, setProduct] = useState(INIT_PRODUCT);
  const [loading, setLoading] = useState(false);

  const onSubmit = event => {
    event.preventDefault();
    console.log("state product", product);
    setLoading(true);

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("status", product.status);
    formData.append("image", product.image);

    fetch('http://localhost:4000/upload-product-form', {
      method: "POST", // "PUT"
      headers: {
        enctype: "multipart/form-data",
      },
      body: formData // JSON.stringify(product)
    })
      .then(response => {
        if (!response.ok) throw new Error("Network Res Err ", response);
        return response.json();
      })
      .then(data => {
        console.log("server data", data);
        setProduct(INIT_PRODUCT);
        alert("Saved on Server Successfully!");
      })
      .catch(err => alert("Error: " + err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="pt-5">
      <form onSubmit={onSubmit}>
        <h2>Add New Product</h2>
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
            required
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
