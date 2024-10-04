import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useState } from "react";

import "@/style/main.scss";

import Topbar from "@/ts/components/Menu/Topbar";
import SidebarMenu from "@/ts/components/Menu/SidebarMenu";
import Home from "@/ts/views/Home/Home";
import Dashboard from "@/ts/views/Dashboard/Dashboard";
import Login from "@/ts/views/Login/Login";
import ProtectedRoute from "@/ts/components/root/ProtectedRoute";
import Calendar from "@/ts/views/Calendar/Calendar";
import DownloadFiles from "@/ts/views/DownloadFiles/DownloadFiles";
import Guests from "@/ts/views/Guests/Guests";
import TablePlanner from "@/ts/views/TablePlanner/TablePlanner";


const App = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* Poniżej protected root */}
                <Route element={<ProtectedRoute />}>
                    <Route path="*" element={
                        <div className="app">
                            <SidebarMenu isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                            <main className="content">
                                <Topbar setIsCollapsed={setIsCollapsed} />
                                {/* Zagnieżdżone trasy chronione */}
                                <Routes>
                                    <Route index element={<Home />} />
                                    <Route path="dashboard" element={<Dashboard />} />
                                    <Route path="goscie" element={<Guests />} />
                                    <Route path="kalendarz" element={<Calendar />} />
                                    <Route path="planer-stolow" element={<TablePlanner />} />
                                    <Route path="pliki-do-pobrania" element={<DownloadFiles />} />
                                    <Route path="moje-konto" element={<DownloadFiles />} />
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
