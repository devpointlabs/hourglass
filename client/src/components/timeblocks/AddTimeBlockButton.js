import React from "react";
import { Button, Icon } from "semantic-ui-react";

const addTimeBlockButton = () => (
  <Button
    style={{
      background: "RebeccaPurple",
      color: "white",
      borderRadius: 0,
      paddingLeft: "0",
      width: "4em",
      height: "4em",
      textAlign: "center"
    }}
    size="large"
    onClick={() => console.log("click")}
  >
    <Icon
      size="large"
      style={{ color: "white", paddingLeft: "22px" }}
      name="add"
    />
  </Button>
);

export default addTimeBlockButton;
