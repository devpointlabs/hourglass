import React from "react";
import axios from "axios";
import ProjectForm from "./ProjectForm";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  Container,
  Icon,
  Table,
  Progress
} from "semantic-ui-react";
import BudgetView from "./BudgetView";

class Projects extends React.Component {
  state = { projects: [], editing: false };

  componentDidMount() {
    axios
      .get("/api/projects")
      .then(res => this.setState({ projects: res.data }));
  }

  showProjects = () => {
    return this.state.projects.map(p => (
      <Table.Row key={p.id}>
        <Table.Cell>
          <Link
            style={{ color: "RebeccaPurple", fontWeight: "bold" }}
            to={`/projects/${p.id}`}
          >
            {p.name ? p.name : "Project has no name"}
          </Link>
        </Table.Cell>
        <Table.Cell>{p.client_name}</Table.Cell>
        <Table.Cell>{p.budget}</Table.Cell>
        <Table.Cell>$$$$$$</Table.Cell>
        <Table.Cell>
          <Progress color="violet" percent="80" />
        </Table.Cell>
        <Table.Cell>$$$$</Table.Cell>
      </Table.Row>
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
          {/* <Grid.Row> */}
          <Grid.Column columns={2} style={{ marginTop: "30px" }}>
            <table class="ui fixed table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Client</th>
                  <th>Budget</th>
                  <th>Spent</th>
                  <th />
                  <th>Remaining</th>
                </tr>
              </thead>
              {this.showProjects()}
            </table>
          </Grid.Column>
          {/* </Grid.Row> */}
        </Grid>
      </Container>
    );
  }
}

export default Projects;
