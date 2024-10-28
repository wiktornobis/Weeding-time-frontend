import Head from "@/ts/helpers/Head.tsx";
import Spinner from "@/ts/components/Spinner.tsx";
import { RootState } from "@/redux/store.ts";
import { useSelector } from "react-redux";

const Home = () => {
    const { userRole } = useSelector((state: RootState) => state.auth);
    return (
        <>
            <Head
                title="Strona Główna"
                description="Strona Główna"
                keywords="Ślub, wesele, aplikacja ślubna"
                robots="index, follow"
            />
            <div className="general-container">
                <Spinner />

            <h1>Witaj, {userRole}!</h1>

            </div>
        </>
    );
};

export default Home;