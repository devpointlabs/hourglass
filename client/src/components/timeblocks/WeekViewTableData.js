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
    showNewRow: false,
    showButton: true
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
    this.setState({ showNewRow: true, showButton: !this.state.showButton });
  };

  submitRow = () => {
    this.setState({ showNewRow: false, showButton: !this.state.showButton });
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
          <Table.Row style={{ background: "#e2e2e2" }}>
            <Table.Cell colSpan="2">
              {this.state.showButton ? (
                <div style={{ textAlign: "left" }}>
                  <Button
                    style={{ background: "RebeccaPurple", color: "white" }}
                    onClick={() => this.addRow()}
                  >
                    New Row
                  </Button>
                </div>
              ) : (
                <div style={{ textAlign: "left" }}>
                  <Button
                    onClick={() => this.submitRow()}
                    style={{ background: "RebeccaPurple", color: "white" }}
                  >
                    Save
                  </Button>
                </div>
              )}
            </Table.Cell>
            <Table.Cell
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.1em"
              }}
            >
              {mondayHours.toFixed(2)}
            </Table.Cell>
            <Table.Cell
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.1em"
              }}
            >
              {tuesdayHours.toFixed(2)}
            </Table.Cell>
            <Table.Cell
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.1em"
              }}
            >
              {wednesdayHours.toFixed(2)}
            </Table.Cell>
            <Table.Cell
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.1em"
              }}
            >
              {thursdayHours.toFixed(2)}
            </Table.Cell>
            <Table.Cell
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.1em"
              }}
            >
              {fridayHours.toFixed(2)}
            </Table.Cell>
            <Table.Cell
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.1em"
              }}
            >
              {saturdayHours.toFixed(2)}
            </Table.Cell>
            <Table.Cell
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.1em"
              }}
            >
              {sundayHours.toFixed(2)}
            </Table.Cell>
            <Table.Cell
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "1.1em"
              }}
            >
              {total.toFixed(2)}
            </Table.Cell>
            <Table.Cell>10</Table.Cell>
          </Table.Row>
        </Table.Body>
      </>
    );
  }
}

export default WeekViewTableData;
