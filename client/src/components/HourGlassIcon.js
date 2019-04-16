import React from "react";
import { TimerConsumer } from "../providers/TimerProvider";
import { Image } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

const HourGlassIcon = ({ timer }) => (
  <Image
    onClick={() => <Redirect to={{ pathname: "/" }} />}
    src={
      timer.timerRunning
        ? require("../images/hourglass.gif")
        : require("../images/hourglass_white_inside.png")
    }
    size="tiny"
    style={{ height: "40px", width: "40px", margin: "5px" }}
  />
);

export class ConnectedHourGlassIcon extends React.Component {
  render() {
    return (
      <TimerConsumer>
        {timer => <HourGlassIcon {...this.props} timer={timer} />}
      </TimerConsumer>
    );
  }
}

export default ConnectedHourGlassIcon;
