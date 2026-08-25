import "./ConcertDetails.scss";
import ConcertStats from "../../components/ConcertStats/ConcertStats.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ConcertDetails = () => {
    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

    const { id } = useParams();
    const url = `http://localhost:3000/concerts/${id}`;

    const [concert, setConcert] = useState(null);

    const [coordinates, setCoordinates] = useState(null);

    const [locationError, setLocationError] = useState(false);

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

    useEffect(() => {
        if (!concert) {
            return;
        }

        const fetchLocation = async () => {
            const address = `${concert.venue}, ${concert.location}`;
            const encodedAddress = encodeURIComponent(address);

            const response = await fetch(
                `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`
            );

            const data = await response.json();

            if (data.features.length > 0) {
                const locationCoordinates = data.features[0].geometry.coordinates;

                setCoordinates({
                    latitude: locationCoordinates[1],
                    longitude: locationCoordinates[0]
                });
            } else {
                setLocationError(true);
            }
        };

        fetchLocation();
    }, [concert]);

    const mapUrl = coordinates
        ? `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${coordinates.longitude},${coordinates.latitude}&zoom=14&marker=lonlat:${coordinates.longitude},${coordinates.latitude};color:%23ff0000;size:medium&apiKey=${apiKey}`
        : "";

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

                {coordinates ? (
                    <img
                        className="concert-map"
                        src={mapUrl}
                        alt={`Map showing ${concert?.venue}`}
                    />
                ) : locationError ? (
                    <p className="map-error">Map location could not be found.</p>
                ) : (
                    <p className="map-loading">Loading map...</p>
                )}

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