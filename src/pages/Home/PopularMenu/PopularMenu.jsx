import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";


const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');
    
    return (
        <section className="mb-12">
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Items"
            ></SectionTitle>
            
            <div className="grid md:grid-cols-2 gap-10"> 
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <Link to='menu'>
            <div class="flex justify-center">
                <button type="button" class="text-yellow-400 mt-6 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">
                    View Full Menu
                </button>
            </div>
                {/* <button className="btn btn-outline border-0 border-b-4 mt-4">View Full Menu</button> */}
            </Link>
        </section>
    );
};

export default PopularMenu;

////jekhane map korbo oikhane grid dibo kom device a koyta column dekhab e.