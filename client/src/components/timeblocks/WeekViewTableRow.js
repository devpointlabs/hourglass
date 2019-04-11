import React from "react";
import { Table, Button } from "semantic-ui-react";
import { returnTaskTotalsByDay } from "./Calculations";
import moment from "moment";

class WeekViewTableRow extends React.Component {
  state = {
    weekTimeBlocks: []
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

    const dayNumber = parseInt(moment(this.props.selectedDate).format("d"));
    console.log(dayNumber);

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
            style={dayNumber === 1 ? styles.highlight : styles.normal}
          >
            {totals[0] && totals[0].toFixed(2)}
          </Table.Cell>
          <Table.Cell
            style={dayNumber === 2 ? styles.highlight : styles.normal}
          >
            {totals[1] && totals[1].toFixed(2)}
          </Table.Cell>
          <Table.Cell
            style={dayNumber === 3 ? styles.highlight : styles.normal}
          >
            {console.log(totals[2])}
            {totals[2] === undefined || totals[2] === NaN
              ? "0"
              : totals[2].toFixed(2)}
          </Table.Cell>
          <Table.Cell
            style={dayNumber === 4 ? styles.highlight : styles.normal}
          >
            {totals[3] && totals[3].toFixed(2)}
          </Table.Cell>
          <Table.Cell
            style={dayNumber === 5 ? styles.highlight : styles.normal}
          >
            {totals[4] && totals[4].toFixed(2)}
          </Table.Cell>
          <Table.Cell
            style={dayNumber === 6 ? styles.highlight : styles.normal}
          >
            {totals[5] && totals[5].toFixed(2)}
          </Table.Cell>
          <Table.Cell
            style={dayNumber === 0 ? styles.highlight : styles.normal}
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

const styles = {
  highlight: {
    textAlign: "center",
    background: "lightgray",
    fontWeight: "bold"
  },

  normal: {
    textAlign: "center"
  }
};
