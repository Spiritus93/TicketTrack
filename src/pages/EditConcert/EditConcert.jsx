import "./EditConcert.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditConcert = () => {
    const { id } = useParams();
    const url = `http://localhost:3000/concerts/${id}`;

    const [concert, setConcert] = useState(null);

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchConcert = async () => {
            const response = await fetch(url);
            const concert = await response.json();
            setConcert(concert);
        };

        fetchConcert();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};

        if (concert.artist.trim() === "") {
            newErrors.artist = "Artist is required.";
        }

        if (concert.tour.trim() === "") {
            newErrors.tour = "Tour is required.";
        }

        if (concert.date.trim() === "") {
            newErrors.date = "Date is required.";
        }
        else {
            const selectedDate = new Date(concert.date);
            const currentDate = new Date();

            currentDate.setHours(0, 0, 0, 0);

            if (selectedDate < currentDate) {
                newErrors.date = "Date can't be older than the current date.";
            }
        }

        if (concert.location.trim() === "") {
            newErrors.location = "Location is required.";
        }

        if (String(concert.ticketsSold).trim() === "") {
            newErrors.ticketsSold = "Tickets sold is required.";
        } else {
            const ticketsSold = Number(concert.ticketsSold);

            if (ticketsSold < 0) {
                newErrors.ticketsSold = "Tickets sold can't be negative.";
            }
        }

        if (String(concert.capacity).trim() === "") {
            newErrors.capacity = "Capacity is required.";
        } else {
            const capacity = Number(concert.capacity);

            if (capacity <= 0) {
                newErrors.capacity = "Capacity must be greater than 0.";
            }
        }

        if (
            concert.ticketsSold !== "" &&
            concert.capacity !== "" &&
            Number(concert.ticketsSold) > Number(concert.capacity)
        ) {
            newErrors.ticketsSold =
                "Tickets sold can't be greater than the capacity of the venue.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(concert)
        });

        window.alert("Concert updated successfully.");

        navigate(`/concert-details/${id}`);
    };

    const handleCancel = () => {
        navigate(`/concert-details/${id}`);
    };

    return(
        <section className="edit-concert">
            <h2>Edit Concert</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="artist">Artist:</label>
                <input
                    type="text"
                    id="artist"
                    name="artist"
                    value={concert?.artist || ""}
                    onChange={(event) => {
                        setConcert({
                            ...concert,
                            artist: event.target.value
                        });
                    }}
                />
                {errors.artist && (
                    <span className="form-error" role="alert">
                        {errors.artist}
                    </span>
                )}

                <label htmlFor="tour">Tour:</label>
                <input
                    type="text"
                    id="tour"
                    name="tour"
                    value={concert?.tour || ""}
                    onChange={(event) => {
                        setConcert({
                            ...concert,
                            tour: event.target.value
                        });
                    }}
                />
                {errors.tour && (
                    <span className="form-error" role="alert">
                        {errors.tour}
                    </span>
                )}

                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={concert?.date || ""}
                    onChange={(event) => {
                        setConcert({
                            ...concert,
                            date: event.target.value
                        });
                    }}
                />
                {errors.date && (
                    <span className="form-error" role="alert">
                        {errors.date}
                    </span>
                )}

                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={concert?.location || ""}
                    onChange={(event) => {
                        setConcert({
                            ...concert,
                            location: event.target.value
                        });
                    }}
                />
                {errors.location && (
                    <span className="form-error" role="alert">
                        {errors.location}
                    </span>
                )}

                <label htmlFor="ticketsSold">Tickets Sold:</label>
                <input
                    type="number"
                    id="ticketsSold"
                    name="ticketsSold"
                    value={concert?.ticketsSold ?? ""}
                    onChange={(event) => {
                        setConcert({
                            ...concert,
                            ticketsSold: event.target.value
                        });
                    }}
                />
                {errors.ticketsSold && (
                    <span className="form-error" role="alert">
                        {errors.ticketsSold}
                    </span>
                )}

                <label htmlFor="capacity">Capacity:</label>
                <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={concert?.capacity || ""}
                    onChange={(event) => {
                        setConcert({
                            ...concert,
                            capacity: event.target.value
                        });
                    }}
                />
                {errors.capacity && (
                    <span className="form-error" role="alert">
                        {errors.capacity}
                    </span>
                )}

                <button className="save-button" type="submit">Save Changes</button>
                <button className="cancel-button" type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </section>
    )
};

export default EditConcert;