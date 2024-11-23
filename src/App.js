import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect} from 'react';

function App() {
  //used to store the fetched blog posts
  const [posts, setPosts] = useState([]);
  //used to store the error messages
  const [error, setError] = useState(null);
  //used to store the loading status whilst data is being fetched
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        // Check if the response is ok
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        //save the data to the state
        setPosts(data);
        //stop the loading const
        setIsLoading(false);
      } catch (err) {
        //save error message to state
        setError(err.message);
        //stop the loading const
        setIsLoading(false);
      }
    };

//run the fetch function
    fetchPosts();
// Empty dependency array means this runs only once
  }, []);  

  return (
    <div className="App">
      <h1>Text goes here</h1>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {!isLoading && !error && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default App;
