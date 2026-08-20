import "./ConcertCard.scss";
import { NavLink } from "react-router-dom";

const ConcertCard = ({ id, artist, tour, date, location, ticketsSold, capacity }) => {
    const formattedDate = new Date(date).toLocaleDateString("sl-SI");

    return (
        <article className="concert-card">
            <h3>{artist}</h3>
            <p>{tour}</p>
            <p>{formattedDate}</p>
            <p>{location}</p>
            <p>{ticketsSold} / {capacity} tickets sold</p>
            <NavLink className="details-link" to={`/concert-details/${id}`}>Concert Details</NavLink>
        </article>
    );
};

export default ConcertCard;