import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.css";

// React app envs need to be prefixed with REACT_APP_
require("dotenv").config();
ReactDOM.render(<App />, document.getElementById("root"));
