import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // withRouter
} from "react-router-dom";


import loginAdmin from "./pages/admin/Login";


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={loginAdmin} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
