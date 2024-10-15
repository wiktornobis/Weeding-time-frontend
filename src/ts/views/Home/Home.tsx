import Head from "@/ts/helpers/Head.tsx";
import Spinner from "@/ts/components/Spinner.tsx";

const Home = () => {
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
                <h1>Hello World</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consectetur ipsum minus odio officia. Eaque facere nam quibusdam rem soluta?</p>
            </div>
        </>
    );
};

export default Home;