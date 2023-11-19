import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import LandingPage from "./views/landingPage/LandingPage";
import HomePage from "./views/homePage/HomePage";
import FormPage from "./views/formPage/FormPage";
import Pagination from "./components/pagination/Pagination";
import DetailPage from "./components/detailPage/DetailPage";

import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
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
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
