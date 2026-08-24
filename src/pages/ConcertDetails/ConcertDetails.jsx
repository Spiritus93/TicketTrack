import "./ConcertDetails.scss";
import ConcertStats from "../../components/ConcertStats/ConcertStats.jsx";
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
                <p><strong>Status:</strong> {concertStatus}</p>
                <p><strong>Tour:</strong> {concert?.tour}</p>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Time:</strong> {concert?.time}</p>
                <p><strong>Venue:</strong> {concert?.venue}</p>
                <p><strong>Location:</strong> {concert?.location}</p>
                <p><strong>Genre:</strong> {concert?.genre}</p>
                <p><strong>Ticket price:</strong> {concert?.ticketPrice} €</p>
                <p>{concert?.description}</p>

                {concert && (
                    <ConcertStats
                        ticketsSold={concert.ticketsSold}
                        capacity={concert.capacity}
                        ticketPrice={concert.ticketPrice}
                    />
                )}

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