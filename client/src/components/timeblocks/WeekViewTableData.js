import React from "react";
import WeekViewTableHeaderRow from "./WeekViewTableHeaderRow";
import WeekViewTableRow from "./WeekViewTableRow";
import { Table, Button } from "semantic-ui-react";
import moment from "moment";
import { returnHoursSplitByDay } from "./Calculations";

class WeekViewTableData extends React.Component {
  state = {
    dayHours: {
      mondayHours: 0,
      tuesdayHours: 0,
      wednesdayHours: 0,
      thursdayHours: 0,
      fridayHours: 0,
      saturdayHours: 0,
      sundayHours: 0,
      total: 0
    }
  };

  componentDidMount = () => {
    const { currentWeekTimeBlocks, monday } = this.props;
    this.setState({
      dayHours: returnHoursSplitByDay(currentWeekTimeBlocks, monday)
    });
  };

  componentDidUpdate = prevProps => {
    const { currentWeekTimeBlocks, monday } = this.props;
    if (prevProps.currentWeekTimeBlocks !== this.props.currentWeekTimeBlocks)
      this.setState({
        dayHours: returnHoursSplitByDay(currentWeekTimeBlocks, monday)
      });
  };

  render() {
    const { currentWeekTimeBlocks, tasks, selectedDate, monday } = this.props;
    const {
      mondayHours,
      tuesdayHours,
      wednesdayHours,
      thursdayHours,
      fridayHours,
      saturdayHours,
      sundayHours,
      total
    } = this.state.dayHours;

    const currentWeekBlocksWithTaskInfo = currentWeekTimeBlocks.map(b => {
      return {
        ...b,
        // {start: '', end: '', taskInfo: tasks}
        taskInfo: tasks
          .filter(t => t.id === b.task_id)
          .reduce((acc, task) => acc + task)
      };
    });

    return (
      <>
        <Table.Header>
          <WeekViewTableHeaderRow selectedDate={selectedDate} monday={monday} />
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan="10" />
          </Table.Row>
          {tasks.map(t => (
            <WeekViewTableRow
              key={t.id}
              task={t}
              selectedDate={this.props.selectedDate}
              monday={monday}
              dayHours={this.state.dayHours}
              currentWeekTimeBlocks={currentWeekTimeBlocks}
            />
          ))}
          <Table.Row>
            <Table.Cell clSpan="10" />
          </Table.Row>
          <Table.Row style={{ background: "lightgray" }}>
            <Table.Cell colSpan="2">
              <Button>New Row</Button>
              <Button>Save</Button>
            </Table.Cell>
            <Table.Cell>{mondayHours.toFixed(2)}</Table.Cell>
            <Table.Cell>{tuesdayHours.toFixed(2)}</Table.Cell>
            <Table.Cell>{wednesdayHours.toFixed(2)}</Table.Cell>
            <Table.Cell>{thursdayHours.toFixed(2)}</Table.Cell>
            <Table.Cell>{fridayHours.toFixed(2)}</Table.Cell>
            <Table.Cell>{saturdayHours.toFixed(2)}</Table.Cell>
            <Table.Cell>{sundayHours.toFixed(2)}</Table.Cell>
            <Table.Cell>{total.toFixed(2)}</Table.Cell>
            <Table.Cell>10</Table.Cell>
          </Table.Row>
        </Table.Body>
      </>
    );
  }
}

export default WeekViewTableData;
