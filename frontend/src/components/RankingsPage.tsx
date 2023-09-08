import React from "react";
import Rankings from "./Rankings";
import Container from '@mui/material/Container';

const RankingsPage: React.FC = () => {
    return (
      <Container maxWidth="sm">
        <Rankings />
      </Container>
    );
};

export default RankingsPage;