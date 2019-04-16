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
  Menu,
  Progress
} from "semantic-ui-react";
import BudgetView from "./BudgetView";


class Projects extends React.Component {
  state = { projects: [], toggleForm: false, project: {} };

  componentDidMount() {
    axios
      .get("api/project/projects_with_data")
      .then(res => this.setState({ projects: res.data }));
  }
  handleToggle = (project) => {
    this.setState({ toggleForm: !this.state.toggleForm, project: project });
  };

  showProjects = () => {
    return this.state.projects.map(p => (
      <>
        <Table.Row key={p.project_id}>
          <Table.Cell>
            <Link
              style={{ color: "RebeccaPurple", fontWeight: "bold" }}
              to={`/projects/${p.project_id}`}
            >
              {p.project_name ? p.project_name : "Project has no name"}
            </Link>
          </Table.Cell>
          <Table.Cell>{p.client_name}</Table.Cell>
          <Table.Cell>{p.budget}</Table.Cell>
          <Table.Cell>{p.total_project_cost}</Table.Cell>
          <Table.Cell style={{ paddingTop: '35px', }}>
            <Progress color="violet" percent={p.percent_spent} />
          </Table.Cell>
          <Table.Cell>{p.percent_spent}</Table.Cell>
          <Table.Cell>
            <Icon name='cog' style={{ color: "RebeccaPurple" }} onClick={() => this.handleToggle(p)} />
          </Table.Cell>

        </Table.Row>
        <div>
          {this.state.toggleForm ? (
            <ProjectForm
              project={this.state.project}
              updateSubmit={this.updateSubmit}
            />
          ) : (
              <div />
            )}
        </div>
      </>
    ));
  };

  render() {
    return (
      <>
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
                    <th>Budget</th>
                    <th>Spent</th>
                    <th />
                    <th>Perecent Spent</th>
                    <th style={{ width: '5%' }}>Edit</th>
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
