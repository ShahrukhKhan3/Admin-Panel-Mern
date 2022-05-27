// https://jsonplaceholder.typicode.com/posts
import { useState, useEffect } from "react";

export default function Users() {
  let [user, setUser] = useState({});
  let [id, setId] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUser(data);
        setLoading(false);
      });
  }, [id]);


  const handleClick = () => {
    setLoading(true);
    setId(id + 1);
  }

  if (loading) return <h1> Loading ...</h1>;

  return (
    <div>
      <h1> Detail of  User {id} </h1>
      <hr />
      <h3>Name = {user.name}</h3>
      <h3>Email = {user.email}</h3>
      <h3>Phone = {user.phone}</h3>
      <br />
      <button onClick={handleClick}> Next User </button>
    </div>
  );
}