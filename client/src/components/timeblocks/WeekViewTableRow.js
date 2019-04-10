import React from "react";
import { Table, Button } from "semantic-ui-react";
import { returnTaskTotalsByDay } from "./Calculations";

class WeekViewTableRow extends React.Component {
  state = {
    weekTimeBlocks: [],
    mondayTotal: 0,
    tuesdayTotal: 0,
    wednesdayTotal: 0,
    thursdayTotal: 0,
    fridayTotal: 0,
    saturdayTotal: 0,
    sundayTotal: 0
  };

  componentDidMount = () => {
    this.getWeekTimeBlocks();
  };

  getWeekTimeBlocks = () => {
    const { currentWeekTimeBlocks, monday } = this.props;
    this.setState({
      weekTimeBlocks: returnTaskTotalsByDay(currentWeekTimeBlocks, monday)
    });
  };

  render() {
    const { task } = this.props;

    const totals = this.state.weekTimeBlocks.map(w =>
      w.reduce((acc, b) => {
        return b.task_id === this.props.task.id
          ? acc + parseFloat(b.hours)
          : acc;
      }, 0)
    );

    return (
      <Table.Row>
        <>
          <Table.Cell>
            <div>
              {task.projectInfo.name}({task.projectInfo.client_name})
            </div>
            <div>{task.name}</div>
          </Table.Cell>
          <Table.Cell>1</Table.Cell>
          <Table.Cell
            style={{
              textAlign: "center"
            }}
          >
            {totals[0] && totals[0].toFixed(2)}
          </Table.Cell>
          <Table.Cell
            style={{
              textAlign: "center"
            }}
          >
            {totals[1] && totals[1].toFixed(2)}
          </Table.Cell>
          <Table.Cell
            style={{
              textAlign: "center"
            }}
          >
            {totals[2] && totals[2].toFixed(2)}
          </Table.Cell>
          <Table.Cell
            style={{
              textAlign: "center"
            }}
          >
            {totals[3] && totals[3].toFixed(2)}
          </Table.Cell>
          <Table.Cell
            style={{
              textAlign: "center"
            }}
          >
            {totals[4] && totals[4].toFixed(2)}
          </Table.Cell>
          <Table.Cell
            style={{
              textAlign: "center"
            }}
          >
            {totals[5] && totals[5].toFixed(2)}
          </Table.Cell>
          <Table.Cell
            style={{
              textAlign: "center"
            }}
          >
            {totals[6] && totals[6].toFixed(2)}
          </Table.Cell>
          <Table.Cell
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1em"
            }}
          >
            {totals
              .reduce((acc, totalNumber) => acc + totalNumber, 0)
              .toFixed(2)}
          </Table.Cell>
        </>
        <Table.Cell>
          <Button>X</Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default WeekViewTableRow;
