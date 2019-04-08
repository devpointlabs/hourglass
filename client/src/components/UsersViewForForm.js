import React from "react";
import { Segment, Button } from "semantic-ui-react";

class UsersViewForForm extends React.Component {
  state = {};

  render() {
    return (
      <>
        {" "}
        <Segment>
          <Button
            style={{ borderRadius: "100%" }}
            color="red"
            icon="times"
            onClick={() => this.handleDelete(this.props.user.id)}
          />
          {this.props.user.name}
        </Segment>
      </>
    );
  }
}

export default UsersViewForForm;
