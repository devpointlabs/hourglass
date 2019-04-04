import React from "react";
import { Switch, Route } from "react-router-dom";
import TimeSheet from "./TimeSheet";
import Pending from "./Pending";
import Unsubmitted from "./Unsubmitted";
import TimeBlockNavbar from "./TimeBlockNavbar";

class TimeBlockSwitch extends React.Component {
  render() {
    return (
      <TimeBlockNavbar>
        <Switch />
      </TimeBlockNavbar>
    );
  }
}

export default TimeBlockSwitch;
