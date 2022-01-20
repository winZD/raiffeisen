import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useMemo, useState, useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";

import { Layout } from "./Componets/Layout/Layout";
import { Container, Button } from "react-bootstrap";
import { BrowserRouter, Route, Routes, Link,Navigate } from "react-router-dom";
import { Sidebar } from "./Componets/Sidebar/Sidebar";
import { Bills } from "./Componets/Bills/Bills";

function App() {
  const [word, setWord] = useState("");

  
  

  const Placanja = () => {
    return <h1>Obsolete</h1>;
  };
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
        
          <Route path="/racuni" element={<Bills />}></Route>
          <Route path="/placanja" element={<Placanja />}></Route>
          
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
