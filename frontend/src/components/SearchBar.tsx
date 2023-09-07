import React, { useState } from 'react';
import axios from 'axios';
import { Title } from '../api/ApiTypes';

interface SearchBarProps {
    setData: React.Dispatch<React.SetStateAction<Title[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarProps> = ({setData, setLoading}) => {
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
            <input
                type="text"
                placeholder="Search anime titles"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
            />

            {/* Button to trigger the API request */}
            <button onClick={handleSearch}>Search</button>

        </div>
    );
};

export default SearchBar;