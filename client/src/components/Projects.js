import React from "react";
import axios from "axios";
import ProjectForm from "./ProjectForm";
import { Link } from "react-router-dom";
import { Grid, Container, Menu } from "semantic-ui-react";

class Projects extends React.Component {
  state = { projects: [], editing: false };

  componentDidMount() {
    axios
      .get("/api/projects")
      .then(res => this.setState({ projects: res.data }));
  }

  showProjects = () => {
    return this.state.projects.map(p => (
      <tbody>
        <tr>
          <td>
            <Link
              style={{ color: "RebeccaPurple", fontWeight: "bold" }}
              to={`/projects/${p.id}`}
            >
              {p.name ? p.name : "Project has no name"}
            </Link>
          </td>
          <td>{p.client_name}</td>
        </tr>
      </tbody>
    ));
  };

  render() {
    return (
      <>
        <div
          style={{
            backgroundImage: "linear-gradient(to right, grey, white)",
            width: "100%",
            height: "5px"
          }}
        />
        <Menu style={{ marginTop: "0" }}>
          <Link to="/projects/new">
            <Menu.Item>Add New Project</Menu.Item>
          </Link>
        </Menu>
        <Container>
          {this.state.editing ? (
            <ProjectForm
              toggleEdit={this.toggleEdit}
              resetState={this.resetState}
            />
          ) : (
            ""
          )}

          <Grid>
            {/* <Grid.Row> */}
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
            {/* </Grid.Row> */}
          </Grid>
        </Container>
      </>
    );
  }
}

export default Projects;
