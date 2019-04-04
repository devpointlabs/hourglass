import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container, Card, Icon } from "semantic-ui-react";
import TaskView from "./TaskView";


class ProjectView extends React.Component {
  state = { project: {} };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/projects/${id}`).then(res => {
      this.setState({ project: res.data });
    });
  }

  showProject = () => {
    const {
      id,
      name,
      client_name,
      planned_start,
      planned_end,
      notes
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
            style={{ height: "300px", width: "2800px", textAlign: "center" }}
          >
            <TaskView id={this.props.match.params.id} />
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
            <Card.Description>{notes}</Card.Description>
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
              height: "200px",
              width: "400px",
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
    debugger;
    axios.delete(`/api/projects/${id}`).then(res => {
      this.props.history.push("/projects");
    });
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
              <Button>Tasks</Button>
              <Button>Team</Button>
            </Button.Group>
          </div>
        </Header>
      </Container>
    );
  }
}

export default ProjectView;
