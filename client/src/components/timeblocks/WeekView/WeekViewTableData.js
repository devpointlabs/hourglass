import React from "react";
import WeekViewTableHeaderRow from "./WeekViewTableHeaderRow";
import WeekViewTableRow from "./WeekViewTableRow";
import { Table, Button } from "semantic-ui-react";
import { returnHoursSplitByDay } from "../Calculations/ReturnHoursSplitByDay";
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
    const {
      currentWeekTimeBlocks,
      monday,
      setSelectedWeek,
      setSelectedDate,
      tasks
    } = this.props;
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

  toggleShowNewRow = () => {
    this.setState({ showNewRow: !this.state.showNewRow });
  };

  render() {
    const {
      currentWeekTimeBlocks,
      tasks,
      monday,
      setSelectedDate,
      setSelectedWeek,
      filteredProjectIds,
      projects,
      selectedDate,
      getCurrentUserTimeBlocks
    } = this.props;
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

    const filteredTasks =
      filteredProjectIds.length > 0
        ? tasks.filter(t => filteredProjectIds.includes(t.project_id))
        : tasks;

    return (
      <>
        <Table.Header>
          <WeekViewTableHeaderRow
            selectedDate={selectedDate}
            monday={monday}
            setSelectedDate={setSelectedDate}
            setSelectedWeek={setSelectedWeek}
          />
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan="10" />
          </Table.Row>

          {filteredTasks.map(t => (
            <WeekViewTableRow
              key={t.id}
              task={t}
              selectedDate={selectedDate}
              monday={monday}
              dayHours={this.state.dayHours}
              currentWeekTimeBlocks={currentWeekTimeBlocks}
              filteredProjectIds={filteredProjectIds}
            />
          ))}

          <Table.Row>
            <Table.Cell colSpan="10" />
          </Table.Row>
          <Table.Row style={{ background: "#e2e2e2" }}>
            <Table.Cell colSpan="1">
              <div style={{ textAlign: "left" }}>
                <Button
                  style={{
                    background: "RebeccaPurple",
                    color: "white",
                    marginLeft: "10px",
                    visibility: this.state.showNewRow ? "hidden" : "visible"
                  }}
                  onClick={() => this.toggleShowNewRow()}
                >
                  New Row
                </Button>
              </div>
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
          </Table.Row>
          {this.state.showNewRow && (
            <NewRowForm
              toggleShowNewRow={this.toggleShowNewRow}
              projects={projects}
              tasks={tasks}
              monday={monday}
              getCurrentUserTimeBlocks={getCurrentUserTimeBlocks}
            />
          )}
        </Table.Body>
      </>
    );
  }
}

export default WeekViewTableData;

//
