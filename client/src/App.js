import React, { Fragment } from "react";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";
import Register from "./components/Register";
import Projects from "./components/Projects";
import ProjectView from "./components/ProjectView";
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Navbar from "./components/NavBar";
import FetchUser from "./components/FetchUser";
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminDashboard from "./components/AdminDashboard";
import TimeBlocks from "./components/timeblocks/TimeBlocks";
import EditForm from "./components/EditForm";
import AssignmentForm from "./components/AssignmentForm";
import TimeSheet from "./components/timeblocks/TimeSheet";
import Pending from "./components/timeblocks/Pending";
import Unsubmitted from "./components/timeblocks/Unsubmitted";
import TaskView from "./components/TaskView";

const App = () => (
  <Fragment>
    <FetchUser>
      <Container style={{ background: "white", minHeight: "100vh" }}>
        <Navbar />
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/projects" component={Projects} />
          <Route exact path="/profile" component={EditForm} />
          <Route exact path="/projects/:id" component={ProjectView} />
          <ProtectedRoute
            exact
            path="/assignments"
            component={AssignmentForm}
          />
          <Route exact path="/profile" component={EditForm} />
          <Route exact path="/projects/:id" component={ProjectView} />
          <Route exact path="/dashboard" component={AdminDashboard} />

          <Route exact path="/timesheet" component={TimeSheet} />
          <Route exact path="/timesheet/pending" component={Pending} />
          <Route exact path="/timesheet/unsubmitted" component={Unsubmitted} />

          <ProtectedRoute exact path="/dashboard" component={AdminDashboard} />
          <ProtectedRoute exact path="/timeblock" component={TimeBlocks} />
          <ProtectedRoute exact path="/taskview" component={TaskView} />

          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </Fragment>
);

export default App;
