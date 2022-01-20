import React, { useEffect, useMemo, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


import "./Layout.scss";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";

export const Layout = (props) => {

    
  return (
    <div className="layout">
      <Header />

      <Sidebar />
      <div className="layout-main">
        <div className="layout-content">{props.children}</div>
      </div>
    </div>
  );
};
