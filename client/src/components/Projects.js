import React from "react";
import axios from "axios";
import ProjectForm from "./ProjectForm";
import { Link } from "react-router-dom";
import { Grid, Button, Container, Icon } from "semantic-ui-react";

class Projects extends React.Component {
  state = { projects: [], editing: false };

  componentDidMount() {
    axios
      .get("/api/projects")
      .then(res => this.setState({ projects: res.data }));
  }

  showProjects = () => {
    return this.state.projects.map(p => (
      <>
        <tbody>
          <tr>
            <td>
              <Link to={`/projects/${p.id}`}>{p.name}</Link>
            </td>
            <td>{p.client_name}</td>
          </tr>
        </tbody>
      </>
    ));
  };

  render() {
    return (
      <Container>
        {this.state.editing ? (
          <ProjectForm
            toggleEdit={this.toggleEdit}
            resetState={this.resetState}
          />
        ) : (
          ""
        )}
        <br />
        <Link to="/projects/new">
          <Button
            style={{ marginTop: "15px" }}
            inverted
            color="violet"
            onClick={this.toggleEdit}
            icon="add"
          >
            {" "}
            Add New Project
          </Button>
        </Link>

        <Grid>
          <Grid.Row>
            <Grid.Column columns={2} style={{ marginTop: "30px" }}>
              <table class="ui fixed table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Client</th>
                  </tr>
                </thead>
                {this.showProjects()}
              </table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Projects;
