import React, { useState } from 'react';
import axios from 'axios';
// import Item type from ApiTypes.tsx
import { Title } from './ApiTypes';

const TitleSearch: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState(''); // State to hold the search title
  const apiUrl = `https://anime-ranking.onrender.com/api/titles`;

  const handleSearch = () => {
    setLoading(true);

    // Make a GET request to the Django API with the searchTitle parameter
    axios
      .get(apiUrl, {
        params: { title: searchTitle }, // Send the title parameter in the query
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>My Component</h1>

      {/* Text input for searching */}
      <input
        type="text"
        placeholder="Enter title"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />

      {/* Button to trigger the API request */}
      <button onClick={handleSearch}>Search</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Data from Django API:</h2>
          <ul>
            {data.map((item : Title) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TitleSearch;
