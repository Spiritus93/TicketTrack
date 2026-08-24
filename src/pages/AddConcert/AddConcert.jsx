import "./AddConcert.scss";
import { useState } from "react";

const AddConcert = () => {
    const [formData, setFormData] = useState({
        artist: "",
        tour: "",
        date: "",
        time: "",
        venue: "",
        location: "",
        genre: "",
        ticketPrice:"",
        ticketsSold: "",
        capacity: "",
        description: "",
        status: "Upcoming",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {};

        if (formData.artist.trim() === "") {
            newErrors.artist = "Artist is required.";
        }

        if (formData.tour.trim() === "") {
            newErrors.tour = "Tour is required.";
        }

        if (formData.date.trim() === "") {
            newErrors.date = "Date is required.";
        }
        else {
            const selectedDate = new Date(formData.date);
            const currentDate = new Date();

            currentDate.setHours(0, 0, 0, 0);

            if (selectedDate < currentDate) {
                newErrors.date = "Date can't be older than the current date.";
            }
        }

        if (formData.time.trim() === "") {
            newErrors.time = "Time is required.";
        }

        if (formData.venue.trim() === "") {
            newErrors.venue = "Venue is required.";
        }

        if (formData.location.trim() === "") {
            newErrors.location = "Location is required.";
        }

        if (formData.ticketPrice.trim() === "") {
            newErrors.ticketPrice = "Ticket price is required.";
        }
        else {
            const ticketPrice = Number(formData.ticketPrice);

            if (ticketPrice < 0) {
                newErrors.ticketPrice = "Ticket price can't be negative.";
            }
        }

        if (formData.ticketsSold.trim() === "") {
            newErrors.ticketsSold = "Tickets sold is required.";
        }
        else {
            const ticketsSold = Number(formData.ticketsSold);

            if (ticketsSold < 0) {
                newErrors.ticketsSold = "Tickets sold can't be negative.";
            }
        }

        if (formData.capacity.trim() === "") {
            newErrors.capacity = "Capacity is required.";
        }
        else {
            const capacity = Number(formData.capacity);

            if (capacity <= 0) {
                newErrors.capacity = "Capacity must be greater than 0.";
            }
        }

        if (
            formData.ticketsSold !== "" &&
            formData.capacity !== "" &&
            Number(formData.ticketsSold) > Number(formData.capacity)
        )
        {
            newErrors.ticketsSold =
                "Tickets sold can't be greater than the capacity of the venue.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newConcert = {
            ...formData,
            ticketsSold: Number(formData.ticketsSold),
            capacity: Number(formData.capacity)
        };

        setErrors(newErrors);

        const response = await fetch("http://localhost:3000/concerts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newConcert)
        });

        if (response.ok) {
            window.alert("Concert added successfully.");
            setFormData({
                artist: "",
                tour: "",
                date: "",
                time: "",
                venue: "",
                location: "",
                genre: "",
                ticketPrice: "",
                ticketsSold: "",
                capacity: "",
                description: "",
                status: "Upcoming"
            });
            setErrors({});
        }
    };

    return (
        <section className="add-concert">
            <h2>New Concert</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="artist">* Artist:</label>
                <input type="text" id="artist" name="artist" value={formData.artist} onChange={handleChange} />
                {errors.artist && (
                    <span className="form-error" role="alert">
                        {errors.artist}
                    </span>
                )}

                <label htmlFor="tour">* Tour:</label>
                <input type="text" id="tour" name="tour" value={formData.tour} onChange={handleChange} />
                {errors.tour && (
                    <span className="form-error" role="alert">
                        {errors.tour}
                    </span>
                )}

                <label htmlFor="date">* Date:</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
                {errors.date && (
                    <span className="form-error" role="alert">
                        {errors.date}
                    </span>
                )}

                <label htmlFor="time">* Time:</label>
                <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} />
                {errors.time && (
                    <span className="form-error" role="alert">
                        {errors.time}
                    </span>
                )}

                <label htmlFor="venue">* Venue:</label>
                <input type="text" id="venue" name="venue" value={formData.venue} onChange={handleChange} />
                {errors.venue && (
                    <span className="form-error" role="alert">
                        {errors.venue}
                    </span>
                )}

                <label htmlFor="location">* Location:</label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
                {errors.location && (
                    <span className="form-error" role="alert">
                        {errors.location}
                    </span>
                )}

                <label htmlFor="genre">Genre:</label>
                <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} />

                <label htmlFor="ticketPrice">* Ticket price (€):</label>
                <input type="number" id="ticketPrice" name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} />
                {errors.ticketPrice && (
                    <span className="form-error" role="alert">
                        {errors.ticketPrice}
                    </span>
                )}

                <label htmlFor="ticketsSold">* Tickets sold:</label>
                <input type="number" id="ticketsSold" name="ticketsSold" value={formData.ticketsSold} onChange={handleChange} />
                {errors.ticketsSold && (
                    <span className="form-error" role="alert">
                        {errors.ticketsSold}
                    </span>
                )}

                <label htmlFor="capacity">* Capacity:</label>
                <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleChange} />
                {errors.capacity && (
                    <span className="form-error" role="alert">
                        {errors.capacity}
                    </span>
                )}

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} />

                <input type="submit" value="Add Concert" />
            </form>
        </section>
    );
};

export default AddConcert;