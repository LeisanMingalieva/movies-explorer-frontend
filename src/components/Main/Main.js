import React from "react";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";

function Main() {
    return (
        <div>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
        </div>
        
    )
}

export default Main;