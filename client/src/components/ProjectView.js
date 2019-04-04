import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container, Card, Icon, Header } from "semantic-ui-react";

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
            style={{
              height: "200px",
              width: "200px",
              display: "flex",
              textAlign: "center"
            }}
          >
            <br />
            <h2>{project.client_name}</h2>
            <Card.Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: "20px"
                }}
              />
            </Card.Header>
            <Card.Description>
              Start Date: {project.planned_start}
            </Card.Description>
            <Card.Description>End Date: {project.planned_end}</Card.Description>
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
