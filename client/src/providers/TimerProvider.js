import React from "react";

const TimerContext = React.createContext();
export const TimerConsumer = TimerContext.Consumer;

export class TimerProvider extends React.Component {
  state = { timerRunning: false };

  toggleTimer = trueFalse => {
    this.setState({ timerRunning: trueFalse });
  };

  render() {
    return (
      <TimerContext.Provider
        value={{
          ...this.state,
          toggleTimer: this.toggleTimer
        }}
      >
        {this.props.children}
      </TimerContext.Provider>
    );
  }
}
