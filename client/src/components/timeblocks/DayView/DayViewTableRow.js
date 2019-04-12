import React from "react";
import { Table, Icon } from "semantic-ui-react";
import TimerStartStopButton from "../TimerStartStopButton";
import moment from "moment";
import { AuthConsumer } from "../../../providers/AuthProvider";
import "../timeSheetDayView.css";

class DayViewTableRow extends React.Component {
  render() {
    const { timeBlock, stopTimer, handleOpen, handleOpen2 } = this.props;

    return (
      <Table.Row
        className={
          timeBlock.status !== "timerStarted" && "timeSheetDayViewTableRow"
        }
        onClick={() => {
          timeBlock.status === "unSubmitted" && handleOpen(timeBlock);
          timeBlock.status === "pendingApproval" && handleOpen2(timeBlock);
        }}
      >
        <Table.Cell style={{ padding: 0 }} colSpan={calcColSpan(timeBlock)}>
          <div>
            {this.props.auth.user.admin && (
              <div>
                <Icon name="user" style={{ color: "RebeccaPurple" }} />
                {this.props.auth.user.name}
              </div>
            )}
            <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>
              {timeBlock.taskInfo && timeBlock.taskInfo.projectInfo.name} (
              {timeBlock.taskInfo && timeBlock.taskInfo.projectInfo.client_name}
              )
            </div>
            <div>{timeBlock.taskInfo && timeBlock.taskInfo.name}</div>
          </div>
        </Table.Cell>
        <Table.Cell
          style={{
            padding: "0 5px 0 5px",
            textAlign: "center",
            fontSize: "1.1em"
          }}
        >
          {parseFloat(timeBlock.hours).toFixed(2)}
        </Table.Cell>
        <Table.Cell style={{ padding: 0, border: "none" }}>
          <div style={{ display: "flex" }}>
            <div style={{ height: "40px" }}>
              {!timeBlock.end_time && (
                <TimerStartStopButton
                  large={false}
                  handleClick={stopTimer}
                  id={timeBlock.id}
                />
              )}
            </div>
            {/* <Button>
                <Icon name="pencil" />
              </Button> */}
          </div>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export class ConnectedDayViewTableRow extends React.Component {
  render() {
    return (
      <AuthConsumer>
        {auth => <DayViewTableRow {...this.props} auth={auth} />}
      </AuthConsumer>
    );
  }
}

export default ConnectedDayViewTableRow;

const calcColSpan = timeBlock => {
  let numberDayOfWeek = moment(timeBlock.start_time).format("d");
  return numberDayOfWeek;
};
