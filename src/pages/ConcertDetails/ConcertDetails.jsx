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
            <h2 className="concerts-title">Concert Details</h2>
            <p>{concert?.artist}</p>
            <p>{concert?.tour}</p>
            <p>{formattedDate}</p>
            <p>{concert?.location}</p>
            <p>{concert?.ticketsSold} / {concert?.capacity} tickets sold</p>
            <button onClick={handleEdit}>Edit Concert</button>
            <button onClick={handleDelete}>Delete Concert</button>
        </section>
    )
}

export default ConcertDetails;