import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import ProjectNavbar from "./ProjectNavbar";
import { Header, Container, Segment, Button } from "semantic-ui-react";
import TaskView from "./TaskView/TaskView";
import BudgetView from "./BudgetView";
import TeamView from "./TeamView";
import EditProjectModal from "./ProjectModals/ProjectEdit/EditModalForms";
import { AuthConsumer } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

class ProjectView extends React.Component {
  state = {
    project: {},
    page: "",

  };

  componentDidMount() {
    this.getProject()
  }

  getProject = () => {
    const { id } = this.props.match.params;
    axios.get(`/api/projects/${id}`).then(res => {
      this.setState({ project: res.data });
    });
  }

  setPage = page => {
    switch (page) {
      case "task":
        this.setState({ page: "task" });
        break;
      case "team":
        this.setState({ page: "team" });
        break;
      case "budget":
        this.setState({ page: "budget" });
        break;
      default:
        return null;
    }
  };



  renderPage = () => {
    switch (this.state.page) {
      case "task":
        return <TaskView project={this.state.project} />;
      case "team":
        return <TeamView project={this.state.project} />;
      case "budget":
        return <BudgetView project={this.state.project} getProject={this.getProject} />;
      default:
        return <BudgetView project={this.state.project} getProject={this.getProject} />;

    }
  };

  render() {
    const {
      project_id,
      project_name,
      client_name,
      planned_start,
      planned_end
    } = this.state.project;
    return (
      <>
{this.props.auth.user.admin ? (<div>
        <ProjectNavbar setPage={this.setPage} />
        <Container
          stackable
          style={{
            paddingTop: "0px",
            margin: "0px"
          }}
        >
          <Header>
            <EditProjectModal
              project={this.state.project}
              projectInfo={
                <span style={{ marginLeft: "20px", cursor: "pointer" }}>
                  <span style={{ fontSize: "1.3em" }}>{project_name}</span>
                  <span style={{ fontSize: ".8em" }}>
                    {" "}
                    {client_name && "(" + client_name + ")"}
                  </span>
                </span>
              }
            />

            <h4 style={{ marginLeft: "20px" }}>
              {" "}
              {planned_start} {planned_start && "-"} {planned_end}
            </h4>
          </Header>

          <Segment>{this.renderPage()}</Segment>
        </Container>
        </div>
) : 
  (
    <div style={{ marginTop: "20px", textAlign: "center", width: "100%"}}>
        <h1 >You do not have access to this page.</h1>
        <Link to="/timesheet">
        <Button style={{
                     
                      background: "RebeccaPurple",
                      color: "white"
                    }}> Return Home </Button>
        </Link>
        </div> 
        )

  }
      </>

    )
}
}
export class ConnectedProjectView extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <ProjectView {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default withRouter(ConnectedProjectView);
