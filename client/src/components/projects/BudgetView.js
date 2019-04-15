import React from "react";
import { Table, Segment, Progress, Header } from "semantic-ui-react";
import axios from "axios";
import TimeSheet from "../timeblocks/TimeSheet";

class BudgetView extends React.Component {
  state = { project: {}, timesheet: [] };

  render() {
    return (
      <>
        <Header as="h1" textAlign="center">
          Budget
        </Header>
        <Table>
          <Table.Row>
            <Table.Cell>Budget</Table.Cell>
            <Table.Cell>Spent</Table.Cell>
            <Table.Cell>Remaining</Table.Cell>
            <Table.Cell>Progress</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>$213</Table.Cell>
            <Table.Cell>$51</Table.Cell>
            <Table.Cell>$162</Table.Cell>
            <Table.Cell>
              <Segment>
                <Progress percent={25} color="violet" />
              </Segment>
            </Table.Cell>
          </Table.Row>
        </Table>
      </>
    );
  }
}

export default BudgetView;
