import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container, Card, Icon } from "semantic-ui-react";

class ProjectView extends React.Component {
  state = { project: {} };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/api/projects/${id}`).then(res => {
      this.setState({ project: res.data });
    });
  }

  showProject = () => {
    const { id, name, client_name, notes } = this.props.match.params;
    return (
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid black"
        }}
      >
        <Link to={`/project/${id}`}>
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
        </Link>
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
      <Container style={{ paddingTop: "20px", marginBottom: "40px" }}>
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
      </Container>
    );
  }
}

export default ProjectView;
