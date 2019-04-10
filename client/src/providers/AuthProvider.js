import React from "react";
import axios from "axios";

const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends React.Component {
  state = { user: null };

  handleRegister = (user, history) => {
    axios
      .post("/api/auth", user)
      .then(res => {
        this.setState({ user: res.data.data });
        history.push("/");
      })
      .catch(res => {
        console.log(res);
      });
  };

  handleLogin = (user, history) => {
    axios
      .post("/api/auth/sign_in", user)
      .then(res => {
        this.setState({ user: res.data.data });
        history.push("/");
      })
      .catch(res => {
        console.log(res);
      });
  };

  handleLogout = history => {
    axios
      .delete("/api/auth/sign_out")
      .then(res => {
        this.setState({ user: null });
        history.push("/login");
      })
      .catch(res => {
        console.log(res);
      });
  };

  handleEdit = (id, user) => {
    let data = new FormData();
    data.append("file", user.file);
    axios
      .put(
        `/api/users/${id}?name=${user.name}&email=${user.email}&nickname=${
          user.nickname
        }&password=${user.password}&passwordConfirmation=${
          user.passwordConfirmation
        }`,
        data
      )
      .then(res => this.setState({ user: res.data }));
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          authenticated: this.state.user !== null,
          handleRegister: this.handleRegister,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          handleEdit: this.handleEdit,
          setUser: user => this.setState({ user }),
          toggleTimerRunning: this.toggleTimerRunning
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
