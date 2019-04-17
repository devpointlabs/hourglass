import React from "react";
import axios from "axios";
import "./usersPage.css";

class AdminCheckbox extends React.Component {
  state = { admin: this.props.user.admin };

  toggle = () => {
    axios
      .put(`/api/toggle_admin`, {
        ...this.props.user,
        admin: this.state.admin,
        user_id: this.props.user.id
      })
      .then(res => this.setState({ admin: !this.state.admin }));
  };

  render() {
    return (
      <>
        <div style={{ display: "flex" }}>
          <div
            style={{
              height: "22px",
              width: "45px",
              border: "solid lightgrey 1px",
              borderRadius: "10px",
              background: this.state.admin ? "rebeccapurple" : "white"
            }}
            onClick={() => {
              this.toggle();
            }}
          >
            {this.state.admin ? (
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  borderRadius: "15px",
                  marginLeft: "25px",
                  background: "white",
                  border: "solid 2px lightGrey"
                }}
              />
            ) : (
              <div
                style={{
                  height: "20px",
                  width: "20px",
                  borderRadius: "10px",
                  background: "lightgrey"
                }}
              />
            )}
          </div>
          {this.state.admin && <div style={{ paddingLeft: "5px" }}>admin</div>}
        </div>
      </>
    );
  }
}

export default AdminCheckbox;
