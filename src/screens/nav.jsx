import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "./dashboard";

const Nav = ({ component: Component }) => {
  const renderRedirect = (props) => {
      console.log(props);
    return (
      <>
        <Dashboard {...props}>
          <Component {...props} />
        </Dashboard>
      </>
    );
  };
  return <Route render={renderRedirect} />;
};
export default Nav;
