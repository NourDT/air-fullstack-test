import "react-widgets/styles.css";
import { Route, Switch } from "react-router";
import Booking from "./pages/Booking";
import AllBooking from "./pages/allBooking";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Booking} />
        <Route exact path="/bookings" component={AllBooking} />
      </Switch>
    </>
  );
}

export default App;
