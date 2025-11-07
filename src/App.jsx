import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Pages/Contact";
import All from "./Pages/All";
import ProductDetail from "./Pages/ProductDetail";
import StorePrice from "./Pages/StorePrice";
import Spinner from "./Components/Spinner";
import useProductStore from "./Store/productStore";
import SearchPage from "./Pages/SearchPage";
import { LanguageProvider } from "./language/LanguageContext.jsx";




function App() {
    const loading = useProductStore((state) => state.loading);

    return (
        <LanguageProvider>

                <div className="container">
                    <div className="pagew_wrapper">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/allProduct" element={<All />} />
                            <Route path="/product/:slug" element={<ProductDetail />} />
                            <Route path="/storePrice" element={<StorePrice />} />
                            <Route path="/storePrice/:slug" element={<StorePrice />} />
                            <Route path="/search" element={<SearchPage />} />
                        </Routes>
                        {loading && <Spinner />}
                    </div>
                </div>

        </LanguageProvider>
    );
}

export default App;
