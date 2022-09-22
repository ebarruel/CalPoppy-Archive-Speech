import { Chatbot } from "./components/Chatbot";
import "./axios-config.js";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.js";
import About from "./components/About";
import Home from "./components/Home";
import Maps from "./components/Maps";
import Contact from "./components/Contact";
import Donate from "./components/Donate";
import PageNotFound from "./components/PageNotFound";
import logo from "./images/spr_sp_logo.png";
import { useState, useEffect } from "react";
import useBreakpoint from "./components/Breakpoint";

import './style/custom.scss';
import {} from "./style/navbar.css"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {
    const breakpoint = useBreakpoint();
    const [ displayNavMobile, setDisplayNavMobile ] = useState(false);
    const [ textNavMobile, setTextNavMobile ] = useState("Menu");

    const onClickNavMobile = () => {
        setDisplayNavMobile(!displayNavMobile);
        setTextNavMobile((textNavMobile === "Menu") ? "Close" : "Menu");
        console.log("Mobile display?", displayNavMobile);
    }

    return (
        <ThemeProvider theme={theme}>  
            <Router>
                <div class="topnav sticky-top">
                    <nav id="nav">
                        <Link to="/">
                            <button
                                class={`
                                    navbutton
                                    ${ breakpoint === "large" ? "navbuttonLarge" : "" } 
                                `}
                                type="button"
                                style={{padding: 1.5}}
                            >
                                {/* Home */}
                                <img src={logo} className="home_logo" alt="poppy logo"/>
                            </button>
                        </Link>
                        <div className={` ${ (breakpoint === "small") ? "topnavMobile" : "" } `}>
                            {breakpoint === "small" && (
                                <button
                                    class="navbutton navbuttonDisplay"
                                    type="button"
                                    onClick={onClickNavMobile}
                                >
                                    {textNavMobile}
                                </button>
                            )}
                            {((breakpoint !== "small") || displayNavMobile) && (
                                <div className={` ${ (breakpoint === "small") ? "topnavMobile" : "" } `}>
                                    <Link to="/chatbot">
                                        <button
                                            class={` navbutton ${ breakpoint === "large" ? "navbuttonLarge" : "" } `}
                                            type="button"
                                        >
                                            Chat
                                        </button>
                                    </Link>
                                    <Link to="/maps">
                                        <button
                                            class={` navbutton ${ breakpoint === "large" ? "navbuttonLarge" : "" } `}
                                            type="button"
                                        >
                                            Maps
                                        </button>
                                    </Link>
                                    <Link to="/about">
                                        <button
                                            class={` navbutton ${ breakpoint === "large" ? "navbuttonLarge" : "" } `}
                                            type="button"
                                        >
                                            Learn More
                                        </button>
                                    </Link>
                                    <Link to="/contact">
                                        <button
                                            class={` navbutton ${ breakpoint === "large" ? "navbuttonLarge" : "" } `}
                                            type="button"
                                        >
                                            Contact
                                        </button>
                                    </Link>
                                    {/* later change link to /Donate */}
                                    <Link to="/Donate">
                                        <button
                                            class={` navbutton ${ breakpoint === "large" ? "navbuttonLarge" : "" } `}
                                            type="button"
                                        >
                                            {/* donation and support tab */}
                                            Help Poppy Grow
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>

            {/* A <Routes> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/chatbot" element={<Chatbot/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/maps" element={<Maps/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/donate" element={<Donate/>}/>
                <Route path="/404" element={<PageNotFound/>}/>
            </Routes>
        </Router>
    </ThemeProvider>
  );
}