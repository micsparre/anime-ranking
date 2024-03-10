import AnimeRoutes from "./components/Routes";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <AnimeRoutes />
      </main>
    </div>
  );
}

export default App;
