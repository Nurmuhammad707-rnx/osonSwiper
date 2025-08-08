    import React from "react";
    import { Link, useLocation } from "react-router-dom";

    const breadcrumbNameMap = {
    home: "Главная",
    allProduct: "Популярные товары", 
    allDrugs: "Barcha dori vositalari",
    products: "Mahsulotlar",
    cart: "Savat",
    checkout: "To‘lov",
    };


    const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    
    return (
        <div className="bread_crumc">
            
        <nav style={{ margin: "16px 0" }}>
        <Link className="a" to="/">
            {breadcrumbNameMap["home"]}
        </Link>
        <span className="active_icon">
            <svg data-v-3fe80857="" className="breadcrumb"  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-3fe80857="" d="M10.36 7.52664L6.5867 3.75997C6.52472 3.69749 6.45099 3.64789 6.36975 3.61405C6.28851 3.5802 6.20137 3.56277 6.11336 3.56277C6.02535 3.56277 5.93822 3.5802 5.85698 3.61405C5.77574 3.64789 5.702 3.69749 5.64003 3.75997C5.51586 3.88488 5.44617 4.05385 5.44617 4.22997C5.44617 4.4061 5.51586 4.57507 5.64003 4.69997L8.94003 8.03331L5.64003 11.3333C5.51586 11.4582 5.44617 11.6272 5.44617 11.8033C5.44617 11.9794 5.51586 12.1484 5.64003 12.2733C5.70177 12.3363 5.7754 12.3864 5.85665 12.4207C5.9379 12.4551 6.02516 12.4729 6.11336 12.4733C6.20157 12.4729 6.28882 12.4551 6.37007 12.4207C6.45132 12.3864 6.52495 12.3363 6.5867 12.2733L10.36 8.50664C10.4277 8.44421 10.4817 8.36844 10.5186 8.28411C10.5556 8.19978 10.5747 8.10871 10.5747 8.01664C10.5747 7.92457 10.5556 7.8335 10.5186 7.74917C10.4817 7.66484 10.4277 7.58907 10.36 7.52664Z" fill="#3873D3"></path></svg>
            </span>
        {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;
            const displayName = breadcrumbNameMap[name] || name;

            return isLast ? (
            <span className="popular" key={index}> {displayName}
            </span>
            ) : (
            <span className="active_icon" key={index}>
                &gt; <Link to={routeTo} style={{ marginRight: 8 }}>{displayName}</Link>
            </span>
            );
        }
        )}
        </nav>
        </div>
    );
    };

    export default Breadcrumbs;










