import { useState, useEffect } from "react";
import search_icon from "../assets/search_icon.svg";
import { NavLink, useNavigate } from "react-router-dom";



import arrowImg from '../assets/arrow-left.svg'

function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const delay = setTimeout(() => {
            if (query.trim().length > 0) {
                fetchData(query);
            } else {
                setResults([]);
            }
        }, 400);

        return () => clearTimeout(delay);
    }, [query]);


    const fetchData = async (searchText) => {
        try {
            const res = await fetch("https://dev.osonapteka.uz/api/web/Product/Search", {
                method: "POST",
                headers: {
                    accept: "text/plain",
                    "Content-Type": "application/json",
                    "CF-Connecting-IP": "213.230.110.212",
                },
                body: JSON.stringify({
                    pageSize: 10,
                    page: 1,
                    searchText,
                    regionList: [1],
                    isWithFullName: true,
                }),
            });

            const data = await res.json();
            console.log("Qidiruv natijasi:", data); 
            setResults(data?.data?.items || []);
        } catch (err) {
            console.error("API xato:", err);
        }
    };

    const handleSelect = (item) => {
        if (item?.slug) {

            navigate("/", { replace: true, state: { selectedDrug: item } });
            
            

            

        }
    };



    return (
        <>
            <div className="searchpage_wrapper" >
                <div className="secondSearch_wrapper">
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="searchSecond"
                        autoComplete="off"
                    >
                        <div className="secondmain_search">
                            <NavLink to="/">
                                <img src={arrowImg} alt="" className="search_imgSecond" />
                            </NavLink>
                          
                            <input
                                type="text"
                                placeholder="Начните вводить в поиск"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="main_searchSecond"
                            />
                            <img className="secondSearch_img" src={search_icon} alt="" />

                        </div>
                        {results.length > 0 && (
                            <div className="search_resultsSecond">
                                {results.map((item, i) => (
                                    <div
                                        key={item.slug || i}
                                        className="search_itemSecond"
                                        onClick={() => handleSelect(item)}
                                    >
                                        <div>
                                            <strong className="search_nameSecond" >
                                                {item.productName}
                                            </strong>
                                            <p className="search_brandSecond" >
                                                {item.brandName || "Dorixona nomi yo‘q"}
                                            </p>
                                            <p className="search_priceSecond">
                                                {item.minPrice > 0
                                                    ? `от ${item.minPrice.toLocaleString()} so‘m`
                                                    : "Narx yo‘q"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}


                    </form>
                </div>
            </div>




        </>
    );
}

export default SearchPage;
