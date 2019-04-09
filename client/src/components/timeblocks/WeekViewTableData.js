import React from "react";
import WeekViewTableHeaderRow from "./WeekViewTableHeaderRow";
import WeekViewTableRow from "./WeekViewTableRow";
import { Table, Button } from "semantic-ui-react";
import { returnHoursSplitByDay } from "./Calculations";
import AddTimeBlockButton from "./AddTimeBlockButton";
import NewRowForm from "./NewRowForm";

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
    },
    showNewRow: false
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

  addRow = () => {
    this.setState({ showNewRow: true });
  };

  submitRow = () => {
    this.setState({ showNewRow: false });
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

          {this.state.showNewRow && <NewRowForm />}

          <Table.Row>
            <Table.Cell colSpan="10" />
          </Table.Row>
          <Table.Row style={{ background: "lightgray" }}>
            <Table.Cell colSpan="2">
              <Button onClick={() => this.addRow()}>New Row</Button>
              <Button onClick={() => this.submitRow()}>Save</Button>
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
