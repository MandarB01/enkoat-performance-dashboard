import "./App.css";
import DashboardContainer from "./components/DashboardContainer";
import logo from "./assets/enkoat-logo-updated-new.png";

function App() {
  return (
    <div>
      <header className="app-header">
        <img src={logo} alt="Enkoat Logo" className="company-logo" />
        <h1>Performance Metrics Dashboard</h1>
      </header>
      <main>
        <DashboardContainer />
      </main>
    </div>
  );
}

export default App;
