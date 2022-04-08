import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { configureFirebase } from "./utils/appUtils";

// Pages and components
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from './pages/Login';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  const [firebaseLoaded, setFirebaseLoaded] = useState();

  useEffect(() => {
    configureFirebase().then(() => setFirebaseLoaded(true));
  }, [])

  return (
    <>
    { firebaseLoaded &&
      <Routes>
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
            <PrivateRoute fallbackRoute="login">
              <Home />
            </PrivateRoute>}
        />
      </Routes>
    }
    </>
  );
}

export default App;
