import CustomRouter from "./components/CustomRouter";

function App() {
  return (
    <div className="app flex flex-col min-h-screen">
      <main className="flex-grow">
        <CustomRouter />
      </main>
    </div>
  );
}

export default App;
