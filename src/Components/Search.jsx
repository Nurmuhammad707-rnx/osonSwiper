import { useState, useEffect } from "react";
import search_icon from "../assets/search_icon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import close_img from "../assets/close_img.svg"
import all_trash from "../assets/all_trash.svg"


function Search() {
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const [results, setResults] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const navigate = useNavigate();

  const [incomingDrug, setIncomingDrug] = useState(null);

  const location = useLocation();
  const selectedDrug = location.state?.selectedDrug;


  useEffect(() => {
    if (selectedDrug) {
      setSelectedList((prev) => {
        const exists = prev.some((d) => d.slug === selectedDrug.slug);
        if (!exists) {
          return [...prev, selectedDrug];
        }
        return prev;
      });

      //  faqat "/search" sahifasida bosen navigate ishlasin
      if (location.pathname === "/search") {
        navigate("/", { replace: true, state: {} });
      }
    }
  }, [selectedDrug, navigate, location.pathname]);



  useEffect(() => {
    if (location.state?.selectedDrug) {
      setIncomingDrug(location.state.selectedDrug);

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (incomingDrug) {
      setSelectedList((prev) => {
        const exists = prev.some((d) => d.slug === incomingDrug.slug);
        return exists ? prev : [...prev, incomingDrug];
      });
    }
  }, [incomingDrug]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedDrugs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSelectedList(parsed);
        }
      } catch (err) {
        console.error("localStorage parsing xatosi:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedDrugs", JSON.stringify(selectedList));
  }, [selectedList]);



  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length > 0) {
        fetchData(query);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  const fetchData = async (searchText) => {
    try {
      const res = await fetch("https://dev.osonapteka.uz/api/web/Product/Search", {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json-patch+json",
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
      setResults(data?.data?.items || []);
    } catch (err) {
      console.error("API xato:", err);
    }
  };

  useEffect(() => {
    console.log("Qabul qilingan dori:", selectedDrug);
  }, [selectedDrug]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedDrugs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSelectedList(parsed);
        }
      } catch (err) {
        console.error("localStorage parsing xatosi:", err);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("selectedDrugs", JSON.stringify(selectedList));
  }, [selectedList]);




  const handleSelect = (item) => {
    const itemId = item.slug;
    setSelectedList((prev) => {
      const alreadySelected = prev.find((d) => d.slug === itemId);
      if (!alreadySelected) {
        return [...prev, item];
      }
      return prev;
    });
    setQuery("");
  };

  const handleDelete = (slug) => {
    setSelectedList((prev) => prev.filter((d) => d.slug !== slug));
  };

  const handleClearAll = () => {
    setSelectedList([]);
    localStorage.removeItem("selectedDrugs");
  };






  const handleSearch = (e) => {
    e.preventDefault();       
    e.stopPropagation();     

    if (selectedList.length === 1) {
      navigate(`/storePrice/${selectedList[0].slug}`);
    } else if (selectedList.length > 1) {
      navigate("/storePrice", { state: { drugs: selectedList } });
    }
  };





  const handleOpenDetail = (slug) => {
    if (slug) {
      navigate(`/product/${slug}`);
    }
  };

  const form = (
    <div className="search_wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="search"
        autoComplete="off"
      >
        <button type="submit" className="search_button">
          <img src={search_icon} alt="" className="search_img" />
        </button>

        <input
          type="text"
          placeholder="Начните вводить в поиск"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="main_search"
          autoComplete="off"
        />

        {results.length > 0 && (
          <div className="search_results">
            {results.map((item, i) => (
              <div
                key={item.slug || item.productId || `result-${i}`}
                className="search_item"
                onClick={() => handleSelect(item)}
              >
                <div className="search_info">
                  <div>
                    <strong className="search_name">{item.productName}</strong>
                    <p className="search_brand">
                      {item.brandName || "Dorixona nomi yo‘q"}
                    </p>
                  </div>
                  {item.minPrice > 0 ? (
                    <p className="search_price">
                      от {item.minPrice.toLocaleString()}
                    </p>
                  ) : (
                    <p className="search_price search_no_price">Narx yo‘q</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </form>


      {/* tanlangan dori  */}
      {selectedList.length > 0 && (
        <div className="selected_list">
          {selectedList.map((selected) => (
            <div key={selected.slug} className="selected_drug">
              <div
                className="selected_info"
                onClick={() => handleOpenDetail(selected.slug)}
                style={{ cursor: "pointer" }}
              >
                <div className="searchImg_wrapper">
                  <img className="search_imgUrl" src={selected.imageURI} alt="" />
                </div>
                <div className="searchInfo_wrapper">
                  <strong className="search_nameSelected">{selected.productName}</strong>
                  <p className="search_brandSelected">
                    {selected.brandName || "Dorixona nomi yo‘q"}
                  </p>
                  <p className="searchprice">
                    {selected.minPrice > 0
                      ? `от ${selected.minPrice.toLocaleString()}`
                      : "Narx mavjud emas"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="clear_btn"
                onClick={() => handleDelete(selected.slug)}
              >
                <img src={close_img} alt="" />
              </button>
            </div>
          ))}

          <div className="selected_actions">
            <button className="clear_all_btn" onClick={handleClearAll}>
              <img src={all_trash} alt="" />
              <p style={{ margin: 0 }}>
                Очистить
              </p>
            </button>


            <button className="search_btn" onClick={handleSearch}>
              Начать поиск
            </button>

          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {isMobile && !location.state?.selectedDrug ? (
        <NavLink to="/search">{form}</NavLink>
      ) : (
        form
      )}
    </div>
  );


  // return <div>{isMobile ? form : form}</div>;
  // return <div>{form}</div>;

}

export default Search;