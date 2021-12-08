import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  return (
    <Container className="App" fluid="xl">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Container>
  );
}

export default App;
