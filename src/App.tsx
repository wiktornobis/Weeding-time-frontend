import { BrowserRouter, Route, Routes } from "react-router-dom";

import "@/style/main.scss";
import Home from "@/ts/views/Home/Home";
import Dashboard from "@/ts/views/Dashboard/Dashboard";
import Login from "@/ts/views/Login/Login";
import ProtectedRoute from "@/ts/components/root/ProtectedRoute";
import Calendar from "@/ts/views/Calendar/Calendar";
import DownloadFiles from "@/ts/views/DownloadFiles/DownloadFiles";
import Guests from "@/ts/views/Guests/Guests";
import TablePlanner from "@/ts/views/TablePlanner/TablePlanner";
// import Account from "@/ts/views/Account/Account.tsx";
import { RoleAccount } from "@/api/Account/types.ts";
import AdminLayout from "@/ts/components/root/AdminLayout.tsx";

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* Trasa dostępna dla niezalogowanych (np. login) */}
                <Route path="/login" element={<Login />} />

                {/* Trasa tylko dla Admina */}
                <Route element={<ProtectedRoute allowedRoles={[RoleAccount.Admin]} />}>
                    <Route path="/dashboard" element={
                        <AdminLayout>
                            <Dashboard />
                        </AdminLayout>
                    } />
                </Route>
                {/* Trasa dostępna tylko dla Gości */}
                <Route element={<ProtectedRoute allowedRoles={[RoleAccount.Guest]} />}>
                    {/*<Route path="/moje-konto" element={<Account />} />*/}
                </Route>

                {/* Trasa dostępna dla zalogowanych użytkowników */}
                <Route element={<ProtectedRoute />}>
                    <Route path="*" element={
                        <div className="app">
                            <main className="content">
                                <Routes>
                                    <Route index element={<Home />} />
                                    <Route path="goscie" element={<Guests />} />
                                    <Route path="kalendarz" element={<Calendar />} />
                                    <Route path="planer-stolow" element={<TablePlanner />} />
                                    <Route path="pliki-do-pobrania" element={<DownloadFiles />} />
                                </Routes>
                            </main>
                        </div>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
