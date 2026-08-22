import "./ConcertDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ConcertDetails = () => {
    const { id } = useParams();
    const url = `http://localhost:3000/concerts/${id}`;

    const [concert, setConcert] = useState(null);

    const formattedDate = concert?.date
        ? new Date(concert.date).toLocaleDateString("sl-SI")
        : "";

    let concertStatus = concert?.status;

    if (concert) {
        const concertDate = new Date(concert.date);
        const currentDate = new Date();

        currentDate.setHours(0, 0, 0, 0);

        if (concert.status !== "Cancelled" && concertDate < currentDate) {
            concertStatus = "Completed";
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        const fetchConcert = async () => {
            const response = await fetch(url);
            const concert = await response.json();
            setConcert(concert);
        };

        fetchConcert();
    }, [id]);

    const remainingTickets = concert
        ? concert.capacity - concert.ticketsSold
        : 0;


    const handleEdit = () => {
        navigate(`/edit-concert/${id}`);
    };

    const handleDelete = async () => {
        const confirmDeletion = window.confirm("Are you sure you want to delete this concert?");

        if (!confirmDeletion) {
            return;
        }

        await fetch(url, {
            method: "DELETE"
        });

        window.alert("Concert deleted successfully.");

        navigate("/");
    };

    return(
        <section className="concerts">
            <h2 className="concerts-title-details">Concert Details</h2>
            <div className="concert-details">
                <h3>{concert?.artist}</h3>
                <p>Status: {concertStatus}</p>
                <p>Tour: {concert?.tour}</p>
                <p>Date: {formattedDate}</p>
                <p>Time: {concert?.time}</p>
                <p>Venue: {concert?.venue}</p>
                <p>Location: {concert?.location}</p>
                <p>Genre: {concert?.genre}</p>
                <p>Ticket price: {concert?.ticketPrice} €</p>
                <p className="ticket-info">
                    {concert?.ticketsSold} / {concert?.capacity} tickets sold
                </p>
                <p>Remaining tickets: {remainingTickets}</p>
                <p>{concert?.description}</p>

                <div className="concert-details-actions">
                    {concertStatus !== "Completed" && (
                        <button className="edit-button" onClick={handleEdit}>Edit Concert</button>
                    )}
                    <button className="delete-button" onClick={handleDelete}>
                        Delete Concert
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ConcertDetails;