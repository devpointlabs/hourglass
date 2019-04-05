import React from "react";
import { Menu, Icon, Button, Select } from "semantic-ui-react";
import clickHandler from "./TimeSheetNavbarClickHandler";

class TimeSheetNavbar extends React.Component {
  render() {
    const { view, selectedDate, setSelectedDate } = this.props;
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "8%" }} />
          <h1>{selectedDate}</h1>
          <Button style={{ height: "1.5em", padding: 0 }}>
            pending approval
          </Button>
          <span>
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
                borderRadius: 0,
                padding: "4px",
                height: "3em"
              }}
            >
              <Icon name="right chevron" />
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
          <span>
            <Button
              style={{
                background: view === "day" ? "light gray" : "white",
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
              style={{
                background: view === "week" ? "light gray" : "white",
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
          <select>Team Mates</select>
          <div style={{ width: "8%" }} />
        </div>
      </>
    );
  }
}

export default TimeSheetNavbar;
