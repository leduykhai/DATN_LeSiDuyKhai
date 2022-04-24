import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // withRouter
} from "react-router-dom";


import Login from "./components/screens/Login/Login";


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
