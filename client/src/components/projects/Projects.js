import React from "react";
import axios from "axios";
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
import ModalForms from './ProjectModals/ProjectCreate/ModalForms'
import EditProjectModal from './ProjectModals/ProjectEdit/EditModalForms'


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
          <Table.Cell>{p.percent_spent ? (p.percent_spent).toFixed(2) : 0}%</Table.Cell>
          <Table.Cell>
            <EditProjectModal project={p} />
          </Table.Cell>

        </Table.Row>

      </>
    ));
  };

  render() {
    return (
      <>
        <ModalForms />


        <Container>
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
                    <th>Percent Spent</th>
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