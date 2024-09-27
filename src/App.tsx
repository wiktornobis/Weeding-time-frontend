
import "@/style/main.scss";

import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Topbar from "@/ts/scenes/global/Topbar";
import SidebarMenu from "@/ts/scenes/global/SidebarMenu";
import Home from "@/ts/Home/Home";
import Dashboard from "@/ts/Dashboard/Dashboard";

const App = () => {
    const [isSidebar, setIsSidebar] = useState(true);
    return (
        <BrowserRouter>
            <div className="app">
            <SidebarMenu isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/*<Route path="/contacts" element={<Contacts />} />*/}
                    {/*<Route path="/invoices" element={<Invoices />} />*/}
                    {/*<Route path="/form" element={<Form />} />*/}
                    {/*<Route path="/bar" element={<Bar />} />*/}
                    {/*<Route path="/pie" element={<Pie />} />*/}
                    {/*<Route path="/line" element={<Line />} />*/}
                    {/*<Route path="/faq" element={<FAQ />} />*/}
                    {/*<Route path="/calendar" element={<Calendar />} />*/}
                    {/*<Route path="/geography" element={<Geography />} />*/}
                </Routes>
            </main>
        </div>
        </BrowserRouter>
    );
};


export default App;
