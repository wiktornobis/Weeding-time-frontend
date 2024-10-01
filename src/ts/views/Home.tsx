import Head from "@/ts/helpers/Head.tsx";
import '@/style/home.scss';

const Home = () => {
    return (
        <>
            <Head
                title="Strona Główna"
                description="Strona Główna"
                keywords="Uczelnie wyższe, wynik z matury, punktacja matura"
                robots="index, follow"
            />

            <section className="general-container">
            </section>
        </>
    );
};
export default Home;
