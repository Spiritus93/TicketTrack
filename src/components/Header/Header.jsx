import "./Header.scss";

const Header = () => {
    return(
        <header className="header">
            <h1>TicketTrack</h1>
            <p>Your personal concert ticket manager.</p>
            <nav className="menu">
                <ul className="menu-list">
                    <li className="menu-item">Home</li>
                    <li className="menu-item">Add Concert</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;