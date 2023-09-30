// src/App.tsx

import React from "react";
import AnimeRoutes from "./components/Routes";
import Footer from "./components/Shared/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <AnimeRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
