import Head from "@/ts/helpers/Head.tsx";
// import Loader from "@/ts/components/Loader.tsx";

import HeroHome from "@/ts/views/Home/HeroHome.tsx";

const Home = () => {

    return (
        <>
            <Head
                title="Strona Główna"
                description="Strona Główna"
                keywords="Ślub, wesele, aplikacja ślubna"
                robots="index, follow"
            />


                <HeroHome />


        </>
    );
};

export default Home;