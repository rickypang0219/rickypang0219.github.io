import React from "react";
import Navbar from "../components/Navbar";

const Layout = ({ colorMode, theme }) => {
  return (
    <div>
      <Navbar colorMode={colorMode} theme={theme} />
      {/* {props.children} */}
    </div>
  );
};

export default Layout;
