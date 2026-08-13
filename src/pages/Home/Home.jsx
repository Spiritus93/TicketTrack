import "./Home.scss";
import ConcertCard from "../../components/ConcertCard/ConcertCard.jsx";
import { useEffect, useState } from "react";

const Home = () => {
    const [concerts, setConcerts] = useState([]);
    const url = "http://localhost:3000/concerts";

    useEffect(() => {

        const fetchConcerts = async () => {
            const response = await fetch(url, {method: "GET"});
            const concerts = await response.json();
            setConcerts(concerts);
        };

        fetchConcerts();

    }, []);

    return(
        <section className="concerts">
            <h2 className="concerts-title">Available Concerts</h2>

            {concerts.map((concert) => (
                <ConcertCard
                    key={concert.id}
                    artist={concert.artist}
                    tour={concert.tour}
                    date={concert.date}
                    location={concert.location}
                    ticketsSold={concert.ticketsSold}
                    capacity={concert.capacity}
                />
            ))}

        </section>
    )
}

export default Home;