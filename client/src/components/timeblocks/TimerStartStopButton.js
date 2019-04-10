import React from "react";
import { TimerConsumer } from "../../providers/TimerProvider";
import { withRouter } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

const TimerStartStopButton = ({ timer: { timerRunning }, handleClick }) => (
  <Button
    onClick={() => handleClick()}
    style={{
      padding: "10px",
      height: "150px",
      width: "150px",
      marginRight: "10px",
      marginTop: "10px",
      backgroundColor: timerRunning ? "RebeccaPurple" : "RebeccaPurple",
      color: timerRunning ? "white" : "white",
      border: "solid lightgray 1px"
    }}
  >
    {timerRunning ? (
      <div style={{ fontSize: "2em" }}>
        <div>
          <img
            style={{
              height: "70px"
            }}
            src={require("../../images/clockgreyface.gif")}
          />
        </div>
        Stop
      </div>
    ) : (
      <div style={{ fontSize: "2em" }}>
        <div>
          <Icon
            name="clock outline"
            size="large"
            style={{
              margin: 0,
              color: "white"
            }}
          />
        </div>
        Start
      </div>
    )}
  </Button>
);

export class ConnectedTimerStartStopButton extends React.Component {
  render() {
    return (
      <TimerConsumer>
        {timer => <TimerStartStopButton {...this.props} timer={timer} />}
      </TimerConsumer>
    );
  }
}

export default withRouter(ConnectedTimerStartStopButton);
