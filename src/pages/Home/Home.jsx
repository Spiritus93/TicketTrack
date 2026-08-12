import "./Home.scss";
import ConcertCard from "../../components/ConcertCard/ConcertCard.jsx";

const Home = () => {
    return(
        <section className="concerts">
            <h2 className="concerts-title">Available Concerts</h2>

            <ConcertCard
                artist="Metallica"
                tour="M72 World Tour"
                date="15 June 2027"
                location="Vienna, Austria"
                ticketsSold={42000}
                capacity={50000}
            />
        </section>
    )
}

export default Home;