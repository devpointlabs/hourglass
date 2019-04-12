import React from "react";
import { Checkbox } from "semantic-ui-react";

class CheckboxComponent extends React.Component {
  state = { checked: false };

  handleClick = blockId => {
    this.setState({ checked: !this.state.checked });
    this.props.handleClickForUnsubmitted(this.state.checked, blockId);
  };

  componentDidUpdate = prevProps => {
    if (prevProps.reset !== this.props.reset) this.setState({ checked: false });
  };

  render() {
    return (
      <>
        <Checkbox
          onChange={() => this.handleClick(this.props.blockId)}
          checked={this.state.checked}
        />
      </>
    );
  }
}

export default CheckboxComponent;
