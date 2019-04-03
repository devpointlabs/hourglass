import React, { Fragment } from "react";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";
import Register from "./components/Register";
import Projects from "./components/Projects";
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Navbar from "./components/NavBar";
import FetchUser from "./components/FetchUser";
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminDashboard from "./components/AdminDashboard";
import TimeBlocks from "./components/TimeBlocks";
import EditForm from "./components/EditForm";

const App = () => (
  <Fragment>
    <FetchUser>
      <Container style={{ background: "white", minHeight: "100vh" }}>
        <Navbar />
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/profile" component={EditForm} />
          <Route exact path="/dashboard" component={AdminDashboard} />
          <Route exact path="/timeblock" component={TimeBlocks} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </Fragment>
);

export default App;
