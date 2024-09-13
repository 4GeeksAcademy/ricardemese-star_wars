//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import injectContext from "./store/appContext.js";

//include your index.scss file into the bundle
import "../styles/index.css";
import Layout from "./Layout.jsx";

//import your own components
const LayoutWithContext = injectContext(Layout);

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
ReactDOM.render(
    <React.StrictMode>
      <LayoutWithContext />
    </React.StrictMode>,
    document.getElementById('root')
  );
