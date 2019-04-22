import React from "react";
import { Table, Segment, Progress, Header } from "semantic-ui-react";
import axios from "axios";
import TimeSheet from "../timeblocks/TimeSheet";
import styled from "styled-components";
import EditModalForms from "./ProjectModals/ProjectEdit/EditModalForms";

class BudgetView extends React.Component {
  state = { project: {}, timesheet: [] };

  renderProgress = percent_spent => {
    switch (true) {
      case percent_spent > 70 && percent_spent < 100:
        return "orange";
      case percent_spent < 70:
        return "green";
      case percent_spent > 100:
        return "red";
      case percent_spent === 0:
        return "grey";
    }
  };

  render() {
    const { project } = this.props;
    return (
      <>
        <Header as="h1" textAlign="center">
          Budget
        </Header>
        <Table>
          <Table.Row>
            <Table.Cell>Budget</Table.Cell>
            <Table.Cell>Spent</Table.Cell>
            <Table.Cell>Percent Spent</Table.Cell>
            <Table.Cell>Progress</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <EditModalForms
                project={this.props.project}
                budget={parseFloat(project.budget).toFixed(2)}
              />
            </Table.Cell>
            <Table.Cell>
              $
              {project.total_project_cost
                ? project.total_project_cost.toFixed(2)
                : 0}
            </Table.Cell>
            <Table.Cell>
              {project.percent_spent
                ? parseFloat(project.percent_spent).toFixed(2)
                : 0}
              %
            </Table.Cell>
            <Table.Cell>
              <Segment>
                {/* <StyledProgressBar> */}
                <Progress
                  color={this.renderProgress(project.percent_spent)}
                  percent={project.percent_spent}
                />
                {/* </StyledProgressBar> */}
              </Segment>
            </Table.Cell>
          </Table.Row>
        </Table>
      </>
    );
  }
}

export default BudgetView;

const StyledProgressBar = styled.div`
  .ui.progress .bar {
    display: block;
    line-height: 1;
    position: relative;
    width: 0%;
    min-width: 0.2em;
    background: #888;
    border-radius: 0.28571429rem;
    transition: width 0.1s ease, background-color 0.1s ease;
    transition-property: width, background-color;
    transition-duration: 0.1s, 0.1s;
    transition-timing-function: ease, ease;
    transition-delay: 0s, 0s;
  }
`;
