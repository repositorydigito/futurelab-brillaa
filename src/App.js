import "./App.css";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import { AppProvider } from "./AppContext";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
