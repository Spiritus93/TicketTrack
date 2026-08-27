import "./ConcertCard.scss";
import { NavLink } from "react-router-dom";

const ConcertCard = ({ id, artist, tour, date, location, ticketsSold, capacity, status }) => {
    const formattedDate = new Date(date).toLocaleDateString("sl-SI");
    const occupancy = capacity > 0 ? (ticketsSold / capacity) * 100 : 0;

    // Automatically marks past concerts as completed unless they were canceled.
    const concertDate = new Date(date);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    let concertStatus = status;

    if (status !== "Cancelled" && concertDate < currentDate) {
        concertStatus = "Completed";
    }

    return (
        <article className="concert-card">
            <div className="concert-card-header">
                <h3>{artist}</h3>
                <p className={`concert-status ${concertStatus.toLowerCase()}`}>
                    {concertStatus}
                </p>
            </div> {/* e: concert-card-header */}
            <div className="concert-card-info">
                <p>{tour}</p>
                <p>{formattedDate}</p>
                <p>{location}</p>
            </div> {/* e: concert-card-info */}
            <div className="ticket-progress">
                <div className="ticket-progress-info">
                    <span>Tickets sold</span>
                    <span>{occupancy.toFixed(0)}%</span>
                </div> {/* e: ticket-progress-info */}

                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${occupancy}%` }}
                    ></div> {/* e: progress-bar-fill */}
                </div> {/* e: progress-bar */}
            </div> {/* e: ticket-progress */}
            <NavLink className="details-link" to={`/concert-details/${id}`}>Concert Details</NavLink>
            {/* e: concert-card */}
        </article>
    );
};

export default ConcertCard;