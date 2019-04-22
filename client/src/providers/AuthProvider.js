import React from "react";
import axios from "axios";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends React.Component {
  state = { user: null, errors: [], flash: {} };

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
        let errors = res.response.data.errors
          ? res.response.data.errors
          : ["Invalid Email or Password"];
        if (!Array.isArray(errors)) errors = [errors];
        const messages = errors.map((message, i) => (
          <div key={i}>{message}</div>
        ));
        this.setFlash(messages, "red", true);
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

  setErrors = errors => {
    this.setState({ errors });
  };

  clearErrors = () => {
    this.setState({ errors: [] });
  };

  setFlash = (message, color, fade) => {
    this.setState({ flash: { message, color, fade } });
  };

  clearFlash = () => {
    this.setState({ flash: {} });
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
          setErrors: this.setErrors,
          clearErrors: this.clearErrors,
          setFlash: this.setFlash,
          clearFlash: this.clearFlash,
          setUser: user => this.setState({ user }),
          toggleTimerRunning: this.toggleTimerRunning
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
