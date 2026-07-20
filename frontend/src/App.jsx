import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-content">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;