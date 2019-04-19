import React from "react";
import { Table, Segment, Progress, Header } from "semantic-ui-react";
import axios from "axios";
import TimeSheet from "../timeblocks/TimeSheet";

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
            <Table.Cell>${project.budget}</Table.Cell>
            <Table.Cell>${project.total_project_cost}</Table.Cell>
            <Table.Cell>
              {project.percent_spent ? project.percent_spent.toFixed(2) : 0}%
            </Table.Cell>
            <Table.Cell>
              <Segment>
                <Progress
                  color={this.renderProgress(project.percent_spent)}
                  percent={project.percent_spent}
                />
              </Segment>
            </Table.Cell>
          </Table.Row>
        </Table>
      </>
    );
  }
}

export default BudgetView;
