import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./main.css";
import TextH from "../NavIcons/TextH";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
	 <header className = 'HED'>
		<div className = 'navHED'>
			<NavBar/>
		</div>
			<nav ref={navRef}>
				
				<TextH />
				
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;