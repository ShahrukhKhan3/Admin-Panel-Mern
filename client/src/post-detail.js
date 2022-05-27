// https://jsonplaceholder.typicode.com/posts
import { useState, useEffect } from "react";
import {useParams, useHistory} from 'react-router-dom';

export default function PostDetail() {
  let {id} = useParams();
  let history = useHistory();
  let [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}?_embed=comments`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPost(data);
        setLoading(false);
      }).catch(err => console.log('Error: ' + err.message));
  }, [id]);

  const handleClick = () => {
    setLoading(true);
    history.push(`/posts/${post.id + 1}`);
  }

  if (loading) return <h1> Loading ...</h1>;

  if(!post || !Object.keys(post).length)
    return <h1> Not post found for id {id}</h1>;

  return (
    <div>
      <h1> React App Deployed to Github Pages </h1>
      <hr />
      <h1> Detail of Post {post.id} </h1>
      <h3>User ID = {post.userId}</h3>
      <h3>Title = {post.title}</h3>
      <h3>Body = {post.body}</h3>
      <br />
      <button onClick={handleClick}> Next Post </button>
      <h1> comments </h1>
      {
        post.comments.map(comment => (
          <>
          <hr />
          <h4>comment id = {comment.id}</h4>
          <h4>comment by = {comment.name}</h4>
          <h4>user email = {comment.email}</h4>
          <h4>comment text = {comment.body}</h4>
          </>
        ))
      }
    </div>
  );
}