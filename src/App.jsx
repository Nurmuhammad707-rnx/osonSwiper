
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Pages/Contact";
import All from "./Pages/All";
import ProductDetail from "./Pages/ProductDetail";
import StorePrice from "./Pages/StorePrice";
import Spinner from "./Components/Spinner";
import useProductStore from "./Store/productStore";

function App() {
    const loading = useProductStore((state) => state.loading);
    return (
        <div className="container">
            <div className="page_wrapper">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/allProduct" element={<All />} />
                    <Route path="/product/:slug" element={<ProductDetail />} />
                    <Route path="/storePrice" element={<StorePrice />} />
                    <Route path="/storePrice/:slug" element={<StorePrice />} />
                </Routes>
                {loading && <Spinner />}
            </div>
        </div>
    );
}

export default App;
