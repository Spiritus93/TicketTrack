import "./ConcertCard.scss";
import { NavLink } from "react-router-dom";

const ConcertCard = ({ id, artist, tour, date, location, ticketsSold, capacity, status }) => {
    const formattedDate = new Date(date).toLocaleDateString("sl-SI");

    const concertDate = new Date(date);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    let concertStatus = status;

    if (status !== "Cancelled" && concertDate < currentDate) {
        concertStatus = "Completed";
    }

    return (
        <article className="concert-card">
            <h3>{artist}</h3>
            <p className="concert-status">{concertStatus}</p>
            <p>{tour}</p>
            <p>{formattedDate}</p>
            <p>{location}</p>
            <p>{ticketsSold} / {capacity} tickets sold</p>
            <NavLink className="details-link" to={`/concert-details/${id}`}>Concert Details</NavLink>
        </article>
    );
};

export default ConcertCard;