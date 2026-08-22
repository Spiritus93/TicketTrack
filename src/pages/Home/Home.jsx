import "./Home.scss";
import ConcertCard from "../../components/ConcertCard/ConcertCard.jsx";
import { useEffect, useState } from "react";

const Home = () => {
    const [concerts, setConcerts] = useState([]);
    const url = "http://localhost:3000/concerts";

    const [sortOption, setSortOption] = useState("date-asc");

    const sortedConcerts = [...concerts].sort((a, b) => {
        if (sortOption === "date-asc") {
            return new Date(a.date) - new Date(b.date);
        }

        if (sortOption === "date-desc") {
            return new Date(b.date) - new Date(a.date);
        }

        if (sortOption === "artist-asc") {
            return a.artist.localeCompare(b.artist);
        }

        if (sortOption === "artist-desc") {
            return b.artist.localeCompare(a.artist);
        }

        return 0;
    });

    useEffect(() => {

        const fetchConcerts = async () => {
            const response = await fetch(url, {method: "GET"});
            const concerts = await response.json();
            setConcerts(concerts);
        };

        fetchConcerts();

    }, []);

    return(
        <div className="home">
            <section className="concerts">
                <h2 className="concerts-title">Available Concerts</h2>
                <select
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value)}
                >
                    <option value="date-asc">Date: earliest first</option>
                    <option value="date-desc">Date: latest first</option>
                    <option value="artist-asc">Artist: A-Z</option>
                    <option value="artist-desc">Artist: Z-A</option>
                </select>
                <div className="concerts-grid">
                    {sortedConcerts.map((concert) => (
                        <ConcertCard
                            key={concert.id}
                            id={concert.id}
                            artist={concert.artist}
                            tour={concert.tour}
                            date={concert.date}
                            location={concert.location}
                            ticketsSold={concert.ticketsSold}
                            capacity={concert.capacity}
                            status={concert.status}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home;