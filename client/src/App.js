import React, { Fragment } from "react";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";
import Register from "./components/Register";
import Projects from "./components/projects/Projects";
import ProjectView from "./components/projects/ProjectView";
import { Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Navbar from "./components/NavBar";
import FetchUser from "./components/FetchUser";
import ProtectedRoute from "./components/ProtectedRoutes";
import EditForm from "./components/projects/EditForm";
import TimeSheet from "./components/timeblocks/TimeSheet";
import Unsubmitted from "./components/timeblocks/Unsubmitted/Unsubmitted";
import EmployeeView from "./components/EmployeeView";
import ApproveTimesheets from "./components/timeblocks/ApproveTimesheets";
import Users from "./components/users/Users";
import GreyGradientLine from "./components/GreyGradientLine";
import Flash from "./components/Flash";
import Error from "./components/Error";
import "./app.css";

const App = () => (
  <Fragment>
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom right, #c1c1c1, #341e4f)"
      }}
    >
      <Error />
      <FetchUser>
        <Container style={{ background: "white", minHeight: "100vh" }}>
          <Navbar />
          <GreyGradientLine />
          <Switch>
            <ProtectedRoute exact path="/" component={TimeSheet} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={EditForm} />
            <ProtectedRoute exact path="/projects" component={Projects} />
            <Route exact path="/projects/:id" component={ProjectView} />
            <Route exact path="/profile" component={EditForm} />
            <ProtectedRoute exact path="/timesheet" component={TimeSheet} />
            <Route
              exact
              path="/timesheet/unsubmitted"
              component={Unsubmitted}
            />
            <Route
              exact
              path="/timesheet/approve_timesheets"
              component={ApproveTimesheets}
            />
            <ProtectedRoute exact path="/users" component={Users} />
            <ProtectedRoute exact path="/users/:id" component={EmployeeView} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </FetchUser>
      <Flash />
    </div>
  </Fragment>
);

export default App;
