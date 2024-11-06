import "@/style/main.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoleAccount } from "@/api/Account/types.ts";
import ProtectedRoute from "@/ts/components/root/ProtectedRoute";
import AdminLayout from "@/ts/components/root/AdminLayout.tsx";
import Dashboard from "@/ts/views/Admin/Dashboard.tsx";
import Invoices from "@/ts/views/Admin/Invoices.tsx";

import Login from "@/ts/views/Login/Login.tsx";
import Home from "@/ts/views/Home/Home";
import Calendar from "@/ts/views/Calendar/Calendar";
import DownloadFiles from "@/ts/views/DownloadFiles/DownloadFiles";
import Guests from "@/ts/views/Guests/Guests";
import TablePlanner from "@/ts/views/TablePlanner/TablePlanner";
import Account from "@/ts/views/Account/Account.tsx";

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/logowanie" element={<Login />} />

                <Route element={<ProtectedRoute allowedRoles={[RoleAccount.ADMIN]} />}>
                    <Route
                        path="/admin/dashboard"
                        element={<AdminLayout><Dashboard /> </AdminLayout>}
                    />
                    <Route
                        path="/admin/faktury"
                        element={<AdminLayout><Invoices /> </AdminLayout>}
                    />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={[RoleAccount.ADMIN, RoleAccount.GROOM, RoleAccount.BRIDE, RoleAccount.WITNESS, RoleAccount.GUEST]} />}>
                    <Route path="/moje-konto" element={<Account />} />
                </Route>

                <Route
                    path="*"
                    element={
                        <div className="app">
                            <main className="content">
                                <Routes>
                                    <Route index element={<Home />} />
                                    <Route element={<ProtectedRoute allowedRoles={[RoleAccount.ADMIN, RoleAccount.GROOM, RoleAccount.BRIDE, RoleAccount.WITNESS]} />}>
                                        <Route path="/goscie" element={<Guests />} />
                                        <Route path="/kalendarz" element={<Calendar />} />
                                        <Route path="/planer-stolow" element={<TablePlanner />} />
                                        <Route path="/pliki-do-pobrania" element={<DownloadFiles />} />
                                    </Route>

                                    <Route element={<ProtectedRoute allowedRoles={[RoleAccount.ADMIN, RoleAccount.GROOM, RoleAccount.BRIDE, RoleAccount.GUEST, ]} />}>
                                        <Route path="/przyjecie" element={<TablePlanner />} />
                                    </Route>
                                </Routes>
                            </main>
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
