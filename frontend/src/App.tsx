import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Booking } from "./Booking";
import { Users } from "./Users";
import { User } from "@prisma/client";

type AppState = {
  users: User[];
};

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_ENDPOINT_URL}/users`, {
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((parsed) => this.setState({ users: parsed }))
      .catch((e) => console.error(e));
  }

  render() {
    return (
      <>
        <Router>
          <Route exact path="/" render={() => <Users users={this.state.users} />} />
          <Route path="/booking/:id" component={Booking} />
        </Router>
      </>
    );
  }
}
