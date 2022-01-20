import React, { useContext, useState } from "react";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faAddressCard,
  faBookOpen,
  faDollarSign,
  faFileAlt,
  faFileSignature,
  faMoneyBill,
  faToolbox,
  faUniversity,
  faUsersCog,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import {useNavigate } from 'react-router-dom'

export const Sidebar = (props) => {


  const NavigationItem = ({ title, icon,routerLink}) => {
    const navigate = useNavigate();

    const handleClick = () => {
     
        navigate(routerLink);
      } 
    
    return (
      <div className="navigation-item-container">
        <div  className="navigation-item" onClick={handleClick}>
        <div className="navigation-icon-container">
          <FontAwesomeIcon icon={icon} />
          
        </div>
        <div className="title">{title}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="sidenav">
     
      <NavigationItem title="Računi" icon={faMoneyBill} routerLink={"/racuni"}/>
      <NavigationItem title="Plaćanja" icon={faDollarSign} routerLink={"/placanja"}/>
    </div>
  );
};
