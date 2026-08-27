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

    // Updates the corresponding concert field when a form value changes.
    const handleChange = (event) => {
        const { name, value } = event.target;

        setConcert({
            ...concert,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Stores all validation errors before updating the concert.
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

        if (concert.time.trim() === "") {
            newErrors.time = "Time is required.";
        }

        if (concert.venue.trim() === "") {
            newErrors.venue = "Venue is required.";
        }

        if (concert.location.trim() === "") {
            newErrors.location = "Location is required.";
        }

        if (concert.ticketPrice.trim() === "") {
            newErrors.ticketPrice = "Ticket price is required.";
        }
        else {
            const ticketPrice = Number(concert.ticketPrice);

            if (ticketPrice < 0) {
                newErrors.ticketPrice = "Ticket price can't be negative.";
            }
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
        )
        {
            newErrors.ticketsSold =
                "Tickets sold can't be greater than the capacity of the venue.";
        }

        if (concert.status === "") {
            newErrors.status = "Status is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Converts numeric form values before saving the updated concert.
        const updatedConcert = {
            ...concert,
            ticketPrice: Number(concert.ticketPrice),
            ticketsSold: Number(concert.ticketsSold),
            capacity: Number(concert.capacity)
        };

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedConcert)
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
                <label htmlFor="artist">* Artist:</label>
                <input
                    type="text"
                    id="artist"
                    name="artist"
                    value={concert?.artist || ""}
                    onChange={handleChange}
                />
                {errors.artist && (
                    <span className="form-error" role="alert">
                        {errors.artist}
                    </span>
                )}

                <label htmlFor="tour">* Tour:</label>
                <input
                    type="text"
                    id="tour"
                    name="tour"
                    value={concert?.tour || ""}
                    onChange={handleChange}
                />
                {errors.tour && (
                    <span className="form-error" role="alert">
                        {errors.tour}
                    </span>
                )}

                <label htmlFor="date">* Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={concert?.date || ""}
                    onChange={handleChange}
                />
                {errors.date && (
                    <span className="form-error" role="alert">
                        {errors.date}
                    </span>
                )}

                <label htmlFor="time">* Time:</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    value={concert?.time || ""}
                    onChange={handleChange}
                />
                {errors.time && (
                    <span className="form-error" role="alert">
                        {errors.time}
                    </span>
                )}

                <label htmlFor="venue">* Venue:</label>
                <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={concert?.venue || ""}
                    onChange={handleChange}
                />
                {errors.venue && (
                    <span className="form-error" role="alert">
                        {errors.venue}
                    </span>
                )}

                <label htmlFor="location">* Location:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={concert?.location || ""}
                    onChange={handleChange}
                />
                {errors.location && (
                    <span className="form-error" role="alert">
                        {errors.location}
                    </span>
                )}

                <label htmlFor="genre">Genre:</label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={concert?.genre || ""}
                    onChange={handleChange}
                />

                <label htmlFor="ticketPrice">* Ticket price (€):</label>
                <input
                    type="number"
                    id="ticketPrice"
                    name="ticketPrice"
                    value={concert?.ticketPrice ?? ""}
                    onChange={handleChange}
                />
                {errors.ticketPrice && (
                    <span className="form-error" role="alert">
                        {errors.ticketPrice}
                    </span>
                )}

                <label htmlFor="ticketsSold">* Tickets Sold:</label>
                <input
                    type="number"
                    id="ticketsSold"
                    name="ticketsSold"
                    value={concert?.ticketsSold ?? ""}
                    onChange={handleChange}
                />
                {errors.ticketsSold && (
                    <span className="form-error" role="alert">
                        {errors.ticketsSold}
                    </span>
                )}

                <label htmlFor="capacity">* Capacity:</label>
                <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={concert?.capacity ?? ""}
                    onChange={handleChange}
                />
                {errors.capacity && (
                    <span className="form-error" role="alert">
                        {errors.capacity}
                    </span>
                )}

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={concert?.description || ""}
                    onChange={handleChange}
                />

                <label htmlFor="status">* Status:</label>
                <select
                    id="status"
                    name="status"
                    value={concert?.status || ""}
                    onChange={handleChange}
                >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <button className="save-button" type="submit">Save Changes</button>
                <button className="cancel-button" type="button" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </section>
    )
};

export default EditConcert;