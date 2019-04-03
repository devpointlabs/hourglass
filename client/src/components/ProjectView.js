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
    const { id, name, client_name } = this.props.match.params;
    return (
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          border: "1px solid black"
        }}
      >
        <Link to={`/project/${id}`}>
          <Card
            style={{ height: "300px", width: "300px", textAlign: "center" }}
          >
            <h3>{name}</h3>
            <Card.Description>{client_name}</Card.Description>
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
        <Link to={"/projects"}>
          <Button color="black" style={{ marginBottom: "20px" }}>
            <Icon name="arrow alternate circle left outline" />
            Go Back
          </Button>
        </Link>
        <div>
          <Link to={`/project/${id}/edit`}>
            <Button inverted color="blue">
              <Icon name="pencil" /> Update Project
            </Button>
          </Link>
          <Button inverted onClick={this.handleDelete} color="red">
            <Icon name="trash" /> Remove Project
          </Button>
        </div>
        <h1>{name}</h1>
        {this.showProject()}
      </Container>
    );
  }
}

export default ProjectView;
