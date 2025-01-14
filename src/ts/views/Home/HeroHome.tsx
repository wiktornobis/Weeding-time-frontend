import "@/style/heroHome.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";


const HeroHome = () => {
    const { userRole } = useSelector((state: RootState) => state.auth);
    return (
        <section className="hero-home-section">
            <h1 className="shinning-text">Witaj, {userRole}!</h1>

        </section>

    );
};

export default HeroHome;