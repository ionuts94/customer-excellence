import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { configureFirebase } from "./actions/init";

// Pages and components
import { Home, Login, SignUp, TakeSurvey } from "./pages";
import { Init, PrivateRoute } from "./components";

const App = () => {
  const [firebaseLoaded, setFirebaseLoaded] = useState();

  useEffect(() => {
    configureFirebase().then(() => setFirebaseLoaded(true));
  }, [])

  return (
    <>
    { firebaseLoaded &&
      <Init>
        <Routes>
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/take_survey/:surveyId" element={<TakeSurvey />} />
          <Route path="/" element={
              <PrivateRoute fallbackRoute="login">
                <Home />
              </PrivateRoute>}
          />
        </Routes>
      </Init>
    }
    </>
  );
}

export default App;
