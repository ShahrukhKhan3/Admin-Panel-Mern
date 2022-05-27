// https://jsonplaceholder.typicode.com/posts
import { useState, useEffect } from "react";

export default function Todos() {
  let [todo, setTodo] = useState({});
  let [id, setId] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTodo(data);
        setLoading(false);
      });
  }, [id]);


  const handleClick = () => {
    setLoading(true);
    setId(id + 1);
  }

  if (loading) return <h1> Loading ...</h1>;

  return (
    <div style={{color: todo.completed ? "green" : "red"}}>
      <h1> Detail of  Todo {id} </h1>
      <hr />
      <h3>Title = {todo.title}</h3>
      <h3> Status = {todo.completed ? "Done" : "Pending"}</h3>
      <br />
      <button onClick={handleClick}> Next Todo </button>
    </div>
  );
}