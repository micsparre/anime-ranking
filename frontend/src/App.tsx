import AnimeRoutes from "./components/Routes";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  useEffect(() => {
    // Persist state changes to localStorage
    if (token === null) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const handleTokenChange = useCallback((token: string | null) => {
    setToken(token);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <AnimeRoutes token={token} handleTokenChange={handleTokenChange} />
      </main>
    </div>
  );
}

export default App;
