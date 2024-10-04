import Head from "@/ts/helpers/Head.tsx";
import HeaderInfiniteAnimation from "@/ts/components/HeaderInfiniteAnimation.tsx";
import { useAccountApi } from "@/api/Account/queries.ts";

const Account = () => {
    const { data, error, isLoading } = useAccountApi();
    let role = "Pana młodego";

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    return (
        <>
            <Head
                title="Moje konto"
                description="Konto użytkownika"
                keywords="Ślub, wesele, aplikacja ślubna"
                robots="index, follow"
            />
            <section className="general-container">
                <HeaderInfiniteAnimation textFirst="Profil" textSecond={role} />
                <div>
                    <h2>Lista Kont</h2>
                    <ul>
                        {data?.data.map(account => (
                            <li key={account.id}>
                                {account.firstName} {account.secondName} - {account.role}
                            </li>
                        ))}
                    </ul>
                </div>

            </section>
        </>
    );
};

export default Account;