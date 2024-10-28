import Head from "@/ts/helpers/Head.tsx";
import HeaderInfiniteAnimation from "@/ts/components/HeaderInfiniteAnimation.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store.ts";

const Account = () => {
    const { userRole } = useSelector((state: RootState) => state.auth);
    return (
        <>
            <Head
                title="Moje konto"
                description="Konto użytkownika"
                keywords="Ślub, wesele, aplikacja ślubna"
                robots="index, follow"
            />
            <section className="general-container">
                <HeaderInfiniteAnimation textFirst="Profil" textSecond={userRole} />
                <div>
                    <h2>Lista Kont</h2>
                </div>

            </section>
        </>
    );
};

export default Account;