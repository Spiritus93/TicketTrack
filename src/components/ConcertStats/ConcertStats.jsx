import "./ConcertStats.scss";

const ConcertStats = ({ ticketsSold, capacity, ticketPrice }) => {
    const remainingTickets = capacity - ticketsSold;
    const revenue = ticketsSold * ticketPrice;
    const occupancy = (ticketsSold / capacity) * 100;

    return (
        <section className="concert-stats">
            <h4>Statistics</h4>

            <p>Tickets sold: {ticketsSold} / {capacity}</p>
            <p>Remaining tickets: {remainingTickets}</p>
            <p>Revenue: {revenue.toLocaleString("sl-SI")} €</p>
            <p>Occupancy: {occupancy.toFixed(1)}%</p>
        </section>
    );
};

export default ConcertStats;