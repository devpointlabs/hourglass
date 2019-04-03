import React from "react";
import axios from "axios";
import ProjectForm from "./ProjectForm";
import {
  Card,
  Grid,
  Button,
  Container,
  Icon,
  CardMeta
} from "semantic-ui-react";

class Projects extends React.Component {
  state = { projects: [], editing: false };

  componentDidMount() {
    axios
      .get("/api/projects")
      .then(res => this.setState({ projects: res.data }));
  }

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };
  showProjects = () => {
    return this.state.projects.map(p => (
      <div
        style={{
          padding: "30px",
          border: "3px solid grey",
          margin: "5px 5px 5px 5px"
        }}
      >
        <Card>
          <Card.Header
            style={{
              fontSize: "20px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {p.name}
          </Card.Header>
          <CardMeta
            style={{
              fontSize: "20px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {p.client_name}
          </CardMeta>
          <Card.Description
            style={{
              fontSize: "20px",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {p.notes}
          </Card.Description>
        </Card>
      </div>
    ));
  };

  render() {
    return (
      <Container>
        <Button
          style={{ marginTop: "15px" }}
          inverted
          color="violet"
          onClick={this.toggleEdit}
        >
          <Icon name={this.state.editing ? "caret up" : "add"} />
          {this.state.editing ? "Hide Form" : "Add New Poject"}
        </Button>
        {this.state.editing ? <ProjectForm /> : <br />}
        <Grid>
          <Grid.Row>
            <Grid.Column columns={3} style={{ marginTop: "30px" }}>
              <Card.Group>{this.showProjects()}</Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Projects;
