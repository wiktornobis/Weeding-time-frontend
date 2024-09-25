import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import "@/less/main.less";

import ScrollToTop from "@/ts/helpers/ScrollToTop.ts";
import Home from "@/ts/views/Home.tsx";
import DataView from "@/ts/views/DataView.tsx";
import NotFound from "@/ts/views/NotFound.tsx";
import Nav from "@/ts/components/Nav.tsx";

const App = () => {

    return (
        <Router>
            <ScrollToTop />
            <Nav />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/dane' element={<DataView/>} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </Router>
    );
};


export default App;
