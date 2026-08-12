import "./ConcertCard.scss";

const ConcertCard = ({ artist, tour, date, location, ticketsSold, capacity }) => {
    return (
        <article className="concert-card">
            <h3>{artist}</h3>
            <p>{tour}</p>
            <p>{date}</p>
            <p>{location}</p>
            <p>{ticketsSold} / {capacity} tickets sold</p>
        </article>
    );
};

export default ConcertCard;