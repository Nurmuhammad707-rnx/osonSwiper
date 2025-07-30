
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Pages/Contact";

function App() {
    return (
        <div className="container">
            <div className="page_wrapper">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
