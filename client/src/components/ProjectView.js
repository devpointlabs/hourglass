import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Header, Button, Container, Card, Icon } from "semantic-ui-react";
import TaskView from "./TaskView";
import TeamView from "./TeamView";

class ProjectView extends React.Component {
  state = { project: {}, taskview: true };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/projects/${id}`).then(res => {
      this.setState({ project: res.data });
    });
  }

  showProject = () => {
    const {
      // id,
      name,
      client_name,
      planned_start
      // planned_end,
      // notes
    } = this.props.match.params;
    const { project } = this.state;
    return (
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "4px solid grey",
          display: "flex",
          justifyContent: "center",
          alignContent: "center"
        }}
      >
        <Card.Group>
          <Card
            style={{ height: "300px", width: "300px", textAlign: "center" }}
          >
            <h2>{name}</h2>
            <Card.Header>{client_name}</Card.Header>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "20px"
              }}
            />
            <Card.Description>START DATE:{planned_start}</Card.Description>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "20px"
              }}
            />
          </Card>

          <Card
            style={{
              height: "300px",
              width: "300px",
              display: "flex",
              textAlign: "center",
              text: "15px"
            }}
          >
            <br />
            <h2> Notes:</h2>
            <h3>{project.notes}</h3>
          </Card>
        </Card.Group>
      </div>
    );
  };

  handleDelete = () => {
    const { id } = this.props.match.params;
    axios.delete(`/api/projects/${id}`).then(res => {
      this.props.history.push("/projects");
    });
  };

  toggleTasks = number => {
    console.log(`Button ${number} was clicked`);
    if (number === 2) {
      return this.setState({ taskview: false });
    }
    if (number === 1) {
      return this.setState({ taskview: true });
    } else {
      return console.log("errors");
    }
  };

  render() {
    const { id, name } = this.state.project;
    return (
      <Container
        style={{
          paddingTop: "20px",
          margin: "40px"
        }}
      >
        <h1>{name}</h1>
        {this.showProject()}
        <br />
        <br />
        <div>
          <Link to={"/projects"}>
            <Button inverted color="violet" style={{ marginBottom: "20px" }}>
              <Icon name="arrow alternate circle left outline" />
              Go Back
            </Button>
          </Link>
          <Link to={`/project/${id}/edit`}>
            <Button inverted color="blue">
              <Icon name="pencil" /> Update Project
            </Button>
          </Link>
          <Button inverted onClick={this.handleDelete} color="red">
            <Icon name="trash" /> Remove Project
          </Button>
        </div>

        <Header>
          <div className="wrapper">
            <Button.Group widths="2">
              <Button buttonNumber={1} onClick={() => this.toggleTasks(1)}>
                Tasks
              </Button>
              <Button buttonNumber={2} onClick={() => this.toggleTasks(2)}>
                Team
              </Button>
            </Button.Group>
          </div>
        </Header>
        {this.state.taskview ? (
          <TaskView id={this.props.match.params.id} />
        ) : (
          <TeamView id={this.props.match.params.id} />
        )}
      </Container>
    );
  }
}

export default ProjectView;
