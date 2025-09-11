
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Pages/Contact";
import All from "./Pages/All";
import ProductDetail from "./Pages/ProductDetail";
import StorePrice from "./Pages/StorePrice";

function App() {
    return (
        <div className="container">
            <div className="page_wrapper">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/allProduct" element={<All/>}/>
                    <Route path="/product/:slug" element={<ProductDetail />} />
                    <Route path="/storePrice" element={<StorePrice />} />
                    <Route path="/storePrice/:slug" element={<StorePrice />} />


                    
                </Routes>
            </div>
        </div>
    );
}

export default App;
