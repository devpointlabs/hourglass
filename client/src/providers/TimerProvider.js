import React from "react";

const TimerContext = React.createContext();
export const TimerConsumer = TimerContext.Consumer;

export class TimerProvider extends React.Component {
  state = { timerRunning: true };

  toggleTimer = () => {
    this.setState({ timerRunning: !this.state.timerRunning });
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
