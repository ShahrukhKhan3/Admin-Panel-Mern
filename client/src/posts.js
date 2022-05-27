// https://jsonplaceholder.typicode.com/posts
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';

export default function Posts() {
  let [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`api.ftc.gov/v0/dnccomplaints?api_key=c2xFSPWcPzehBXwqln2AUCqbvaNiF9uFYiOaMdF4`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1> Loading ...</h1>;

  return (
    <div>
      <h1> List of Posts </h1>
      <hr />
      <ol>
      {posts.map(post => (
        <li key={post.id}> 
          <Link to={`/posts/${post.id}`}> {post.title} </Link>
        </li>)
      )}
      </ol>
    </div>
  );
}