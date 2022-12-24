import React from "react";
import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";

const Busquedas = () => {
  return (
    <>
      <nav className="header">
        <Link className="logo" to="/">
          <img
            src="../images/rafatec_logo.png"
            className="img_sola"
            width="55%"
            alt="Logo Rafatec"
          ></img>
        </Link>
        <ul className="navbar__items">
          <div className="flex">
            <CartWidget />
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Busquedas;
