import React, { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./Pages/Home";
import RestaurantDetail from "./Detail";
import Login from "./Login";
import NotFound from "./Pages/NotFound";

const App = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  console.log(isLoggedin);
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedin={setIsLoggedin} />}
          ></Route>
          <Route
            path="/"
            element={
              isLoggedin ? (
                <Home isLoggedin={isLoggedin} />
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
          <Route
            path="/details/:id"
            element={<RestaurantDetail isLoggedin={isLoggedin} />}
          ></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
