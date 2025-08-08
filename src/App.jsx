
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Pages/Contact";
import All from "./Pages/All";
import ProductDetail from "./Pages/ProductDetail";

function App() {
    return (
        <div className="container">
            <div className="page_wrapper">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/allProduct" element={<All/>}/>
                    <Route path="/product/:slug" element={<ProductDetail />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
