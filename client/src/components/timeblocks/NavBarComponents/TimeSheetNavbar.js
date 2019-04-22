import React from "react";
import { Icon, Button } from "semantic-ui-react";
import clickHandler from "./TimeSheetNavbarClickHandler";
import styled from "styled-components";
import moment from "moment";
import CalendarPicker from "../CalenderPicker/CalendarPicker";

class TimeSheetNavbar extends React.Component {
  render() {
    const {
      view,
      selectedDate,
      setSelectedDate,
      setView,
      setSelectedWeek
    } = this.props;

    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <span
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            {/* <mobileContainer> */}
            <h1>{moment(selectedDate).format("dddd MMM DD")}</h1>
            {/* <Button style={{ height: "1.5em", padding: 0 }}>
            pending approval
          </Button> */}
          </span>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <Button
              onClick={() =>
                clickHandler(
                  selectedDate,
                  "weekLeft",
                  setSelectedDate,
                  setSelectedWeek
                )
              }
              style={{
                flexWrap: "wrap",
                background: "white",
                border: "solid gray 1px",
                marginRight: 0,
                borderRadius: 0,
                padding: "4px",
                height: "3em",
                width: "2.5em"
              }}
            >
              <Icon
                name="angle double left"
                size="large"
                style={{ margin: 0 }}
              />
            </Button>
            <Button
              onClick={() =>
                clickHandler(
                  selectedDate,
                  "dayLeft",
                  setSelectedDate,
                  setSelectedWeek
                )
              }
              style={{
                flexWrap: "wrap",
                background: "white",
                border: "solid gray 1px",
                marginRight: 0,
                borderRadius: 0,
                padding: "4px",
                height: "3em",
                width: "2.5em"
              }}
            >
              <Icon name="angle left" size="large" style={{ margin: 0 }} />
            </Button>
            <Button
              onClick={() =>
                clickHandler(
                  selectedDate,
                  "today",
                  setSelectedDate,
                  setSelectedWeek
                )
              }
              style={{
                flexWrap: "wrap",
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
                clickHandler(
                  selectedDate,
                  "dayRight",
                  setSelectedDate,
                  setSelectedWeek
                )
              }
              style={{
                flexWrap: "wrap",
                background: "white",
                border: "solid gray 1px",
                marginLeft: 0,
                marginRight: 0,
                borderRadius: 0,
                padding: "4px",
                height: "3em",
                width: "2.5em"
              }}
            >
              <Icon name="angle right" size="large" style={{ margin: 0 }} />
            </Button>
            <Button
              onClick={() =>
                clickHandler(
                  selectedDate,
                  "weekRight",
                  setSelectedDate,
                  setSelectedWeek
                )
              }
              style={{
                flexWrap: "wrap",
                background: "white",
                border: "solid gray 1px",
                marginRight: "5px",
                borderRadius: 0,
                padding: "4px",
                height: "3em",
                width: "2.5em"
              }}
            >
              <Icon
                name="angle double right"
                size="large"
                style={{ margin: 0 }}
              />
            </Button>
          </div>
          <CalendarPicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <span>
            <Button
              onClick={() => clickHandler(null, "day", setView)}
              style={{
                background: view === "day" ? "lightgrey" : "white",
                border: "solid gray 1px",
                marginRight: 0,
                marginLeft: "5px",
                borderRadius: 0,
                padding: "4px",
                width: "50px",
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
                width: "50px",
                marginLeft: 0,
                borderRadius: 0,
                padding: "4px",
                height: "3em"
              }}
            >
              Week
            </Button>
          </span>
          <div style={{ width: "40%" }} />
          {/* </mobileContainer> */}
        </div>
      </>
    );
  }
}


// const mobileContainer = styled.div`
//   @media (max-width: 425px) {
//     display: flex;
//     flex-direction: column;
//   }
//   display: flex;
//   flex-direction: row;
// `;

export default TimeSheetNavbar;
