import React, { useState } from 'react';
import axios from 'axios';
import { Anime } from '../Shared/Types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

interface SearchBarProps {
    setData: React.Dispatch<React.SetStateAction<Anime[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setData, setLoading }) => {
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
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Search anime titles"
                    margin="normal"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </Grid>
        </Grid>
    );
};

export default SearchBar;