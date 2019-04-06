import React from "react";
import { Icon, Button, Select } from "semantic-ui-react";
import clickHandler from "./TimeSheetNavbarClickHandler";
import styled from "styled-components";
import Drop from "./TimeSheetNavBarDropdown";
import moment from "moment";
import DatePicker from "./DatePicker";

class TimeSheetNavbar extends React.Component {
  render() {
    const { view, selectedDate, setSelectedDate, setView } = this.props;

    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "8%" }} />
          <h1 style={{ margin: 0, width: "30%" }}>
            {moment(selectedDate).format("dddd MMM DD")}
          </h1>
          <Button style={{ height: "1.5em", padding: 0 }}>
            pending approval
          </Button>
          <span>
            <Button
              onClick={() =>
                clickHandler(selectedDate, "weekLeft", setSelectedDate)
              }
              style={{
                background: "white",
                border: "solid gray 1px",
                marginRight: 0,
                borderRadius: 0,
                padding: "4px",
                height: "3em"
              }}
            >
              <Icon name="angle double left" />
            </Button>
            <Button
              onClick={() =>
                clickHandler(selectedDate, "dayLeft", setSelectedDate)
              }
              style={{
                background: "white",
                border: "solid gray 1px",
                marginRight: 0,
                borderRadius: 0,
                padding: "4px",
                height: "3em"
              }}
            >
              <Icon name="left chevron" />
            </Button>
            <Button
              style={{
                border: "solid gray 1px",
                marginRight: 0,
                marginLeft: 0,
                borderRadius: 0,
                padding: "4px",
                height: "3em"
              }}
            >
              Today
            </Button>
            <Button
              onClick={() =>
                clickHandler(selectedDate, "dayRight", setSelectedDate)
              }
              style={{
                background: "white",
                border: "solid gray 1px",
                marginLeft: 0,
                marginRight: 0,
                borderRadius: 0,
                padding: "4px",
                height: "3em"
              }}
            >
              <Icon name="right chevron" />
            </Button>
            <Button
              onClick={() =>
                clickHandler(selectedDate, "weekRight", setSelectedDate)
              }
              style={{
                background: "white",
                border: "solid gray 1px",
                marginLeft: 0,
                borderRadius: 0,
                padding: "4px",
                height: "3em"
              }}
            >
              <Icon name="angle double right" />
            </Button>
          </span>
          <Button
            style={{
              background: "white",
              border: "solid gray 1px",
              borderRadius: 0,
              padding: "4px",
              height: "3em"
            }}
          >
            <Icon name="calendar" />
          </Button>
          {/* <DatePicker /> */}
          <span>
            <Button
              onClick={() => clickHandler(null, "day", setView)}
              style={{
                background: view === "day" ? "lightgrey" : "white",
                border: "solid gray 1px",
                marginRight: 0,
                borderRadius: 0,
                padding: "4px",
                height: "3em"
              }}
            >
              Day
            </Button>
            <Button
              onClick={() => clickHandler(null, "week", setView)}
              style={{
                background: view === "week" ? "lightgrey" : "white",
                border: "solid gray 1px",
                marginLeft: 0,
                borderRadius: 0,
                padding: "4px",
                height: "3em"
              }}
            >
              Week
            </Button>
          </span>

          <div style={{ width: "20%" }} />
        </div>
        <SelectStyler>
          <Drop />
        </SelectStyler>
      </>
    );
  }
}

export default TimeSheetNavbar;

const SelectStyler = styled.div`
  .ui.selection.dropdown {
    min-width: 7em;
    padding: 0;
  }
`;
