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
import ModalForms from "./ProjectModals/ProjectCreate/ModalForms";
import EditProjectModal from "./ProjectModals/ProjectEdit/EditModalForms";
import "./Projects.css";
import { withRouter } from "react-router-dom";

class Projects extends React.Component {
  state = { projects: [], toggleForm: false, project: {} };

  componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    axios
      .get("api/project/projects_with_data")
      .then(res => this.setState({ projects: res.data }));
  };

  // handleToggle = (project) => {
  //   this.setState({ toggleForm: !this.state.toggleForm, project: project });
  // };

  showProjects = () => {
    return this.state.projects.map(p => (
      <>
        <Table.Row key={p.project_id} className="projectRow">
          <Table.Cell
            onClick={() => this.props.history.push(`/projects/${p.project_id}`)}
            style={{
              fontWeight: "bold",
              fontSize: "1.2em"
            }}
          >
            {p.project_name
              ? p.project_name + (p.client_name && ` (${p.client_name})`)
              : "Project"}
          </Table.Cell>
          <Table.Cell>{p.budget && `$${p.budget}`}</Table.Cell>
          <Table.Cell style={{ width: "5%" }}>
            {p.total_project_cost && `$${p.total_project_cost.toFixed(0)}`}
          </Table.Cell>
          <Table.Cell>
            <Progress color="violet" percent={p.percent_spent} />
          </Table.Cell>
          <Table.Cell>
            {p.percent_spent ? p.percent_spent.toFixed(0) : 0}%
          </Table.Cell>
          <Table.Cell>
            <EditProjectModal getProjects={this.getProjects} project={p} />
          </Table.Cell>
        </Table.Row>
      </>
    ));
  };

  render() {
    return (
      <>
        <ModalForms getProjects={this.getProjects} />
        <div style={{ padding: "20px" }}>
          <Table basic collapsing style={{ width: "100%" }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Project</Table.HeaderCell>
                <Table.HeaderCell>Budget</Table.HeaderCell>
                <Table.HeaderCell
                  colSpan="2"
                  style={{ width: "25%" }}
                  textAlign="center"
                >
                  Current Cost
                </Table.HeaderCell>
                <Table.HeaderCell />
                <Table.HeaderCell style={{ width: "5%" }} />
              </Table.Row>
            </Table.Header>
            {this.showProjects()}
          </Table>
        </div>
      </>
    );
  }
}

export default withRouter(Projects);
