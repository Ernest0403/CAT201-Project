import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:8080/cat201_project_war_exploded/hello-servlet')
        .then(response => response.json())
        .then(data => setMessage(data.message))
        .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
      <div>
        <h1>Message from API:</h1>
        <p>{message}</p>
      </div>
  );
}

export default App;
