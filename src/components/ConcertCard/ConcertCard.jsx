import "./ConcertCard.scss";

const ConcertCard = ({ artist, tour, date, location, ticketsSold, capacity }) => {
    const formattedDate = new Date(date).toLocaleDateString("sl-SI");

    return (
        <article className="concert-card">
            <h3>{artist}</h3>
            <p>{tour}</p>
            <p>{formattedDate}</p>
            <p>{location}</p>
            <p>{ticketsSold} / {capacity} tickets sold</p>
        </article>
    );
};

export default ConcertCard;