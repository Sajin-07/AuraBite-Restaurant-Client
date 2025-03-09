import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";
import CartDrawer from "../pages/Dashboard/Cart/CartDrawer";
import Gemini from "../pages/Home/Gemini/Gemini";


const Main = () => {
    const location = useLocation();
    
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');

    return (
        <div>
            { noHeaderFooter || <NavBar></NavBar>}
            { noHeaderFooter || <CartDrawer></CartDrawer>}
            { noHeaderFooter || <Gemini></Gemini>}

            <Outlet></Outlet>
            { noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;