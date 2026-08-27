import "./Header.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
    return(
        <header className="header">
            <div className="brand">
                <h1>TicketTrack</h1>
                <p>Your personal concert ticket manager.</p>
            </div> {/* e: brand */}
            <nav className="main-menu">
                <ul className="menu-list">
                    <li className="menu-item"><NavLink to="/">Home</NavLink></li>
                    <li className="menu-item"><NavLink to="/add-concert">Add Concert</NavLink></li>
                </ul> {/* e: menu-list */}
            </nav> {/* e: main-menu */}
            {/* e: header */}
        </header>
    )
}

export default Header;