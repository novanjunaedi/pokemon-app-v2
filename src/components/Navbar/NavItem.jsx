import { NavLink } from "react-router-dom";

const NavItem = ({ title, href }) => {

    const pathname = window.location.pathname;

    // Check if the current path is the homepage
    const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

    return (
        <NavLink className="relative my-5" to={href}>
            <span className={`hover:text-blue-500 ${isActive ? 'text-blue-500 font-bold' : 'text-slate-800'}`}>{title}</span>
        </NavLink>
    );
};

export default NavItem;
