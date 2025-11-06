// import { createContext, useContext, useEffect, useState } from "react";
// import { useLanguage } from "./LanguageContext";

// const CarouselContext = createContext();

// export const CarouselProvider = ({ children }) => {
//   const { language } = useLanguage();
//   const [pagesData, setPagesData] = useState({});
//   const [loading, setLoading] = useState(false);

//   const fetchCarousel = async (page) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`https://dev.osonapteka.uz/api/web/Carousel/${page}/${language}`);
//       const data = await res.json();
//       setPagesData(prev => ({ ...prev, [page]: data }));
//     } catch (err) {
//       console.error(`Carousel fetch error for ${page}:`, err);
//       setPagesData(prev => ({ ...prev, [page]: { data: [] } }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <CarouselContext.Provider value={{ pagesData, fetchCarousel, loading }}>
//       {children}
//     </CarouselContext.Provider>
//   );
// };

// export const useCarousel = () => useContext(CarouselContext);
