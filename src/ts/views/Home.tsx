import Head from "@/ts/helpers/Head.tsx";
import '@/less/home.less';

import HeroLogo from "@/ts/components/HeroLogo.tsx";

const Home = () => {


    return (
        <>
            <Head
                title="Strona Główna"
                description="Strona Główna"
                keywords="Uczelnie wyższe, wynik z matury, punktacja matura"
                robots="index, follow"
            />

            <HeroLogo />
            <section className="general-container">
            </section>
        </>
    );
};
export default Home;
