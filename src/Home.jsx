
import Search from "./Components/Search";
import Swiper from "./Components/Swiper";
import Products from "./Components/Products";
import Add from "./Components/Add";
import Header from "./Header";
import Footer from "./Components/Footer";
import MiddleFooter from "./Components/MidddeFooter";
import FooterBottom from "./Components/FooterBottom";
import LastBottom from "./Components/LastBottom";
import DrugsSearch from "./Components/DrugsSearch";



function Home() {
    return (
        <div>
            <Header/>
            <DrugsSearch/>
            <Search />
            <Swiper />
            <Products />
            <Add />
            <Footer/>
            <MiddleFooter/>
            <FooterBottom/>
            <LastBottom/>

        </div>
    );  
}

export default Home;
