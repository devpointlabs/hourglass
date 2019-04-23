import React from "react";

const CircleCountContext = React.createContext();
export const CircleCountConsumer = CircleCountContext.Consumer;

export class CircleCountProvider extends React.Component {
  state = { unSubmittedCircleCount: "", pendingCircleCount: "" };

  setCircle = (circle, count) => {
    this.setState({ [circle]: count });
  };

  render() {
    return (
      <CircleCountContext.Provider
        value={{
          ...this.state,
          setCircle: this.setCircle
        }}
      >
        {this.props.children}
      </CircleCountContext.Provider>
    );
  }
}
