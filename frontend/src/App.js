import Shop from "./Shop";
import AdminPanel from "./AdminPanel";

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin" component={AdminPanel} />
          <Route path="*" component={Shop} />
        </Switch>
      </Router>
    );
  }
}

export default App;
