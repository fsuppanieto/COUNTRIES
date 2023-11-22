import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/navBar/NavBar";
import LandingPage from "./views/landingPage/LandingPage";
import HomePage from "./views/homePage/HomePage";
import FormPage from "./views/formPage/FormPage";
import Pagination from "./components/pagination/Pagination";
import DetailPage from "./components/detailPage/DetailPage";
import About from "./components/about/About";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />{" "}
        {/* Agrega el Navbar fuera del componente Routes para que esté presente en todas las páginas */}
        <Routes>
          <Route exact path="/" element={<LandingPage />} />

          <Route
            path="/home"
            element={
              <>
                <HomePage />
                <Pagination />
              </>
            }
          />
          <Route path="/country/:id" element={<DetailPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
