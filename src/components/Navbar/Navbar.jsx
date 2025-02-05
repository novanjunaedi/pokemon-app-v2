import { FaBars } from "react-icons/fa";
import NavItem from "./NavItem";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";

const navItems = [
    {
        title: "Pokemons",
        href: "/",
    },
    {
        title: "Favorites",
        href: "/favorites",
    },
    {
        title: "About",
        href: "/about",
    }
];

const Navbar = () => {
    return (
        <nav className="w-full sticky top-0 z-20 shadow-lg bg-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border border-slate-100 text-slate-800">
            <div className="container mx-auto py-4">
                <div className="flex items-center justify-between w-full">
                    <NavLink to="/">
                        <img
                            src="/assets/pokedex-logo.png"
                            alt="logo"
                            width="150"
                            height="150"
                        />
                    </NavLink>
                    <ul className="hidden lg:flex items-center gap-4">
                        {navItems.map((item) => (
                            <li key={item.title}>
                                <NavItem
                                    title={item.title}
                                    href={item.href}
                                />
                            </li>
                        ))}
                    </ul>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="icon" className="lg:hidden">
                                <FaBars />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="border-0">
                            <ul className="grid gap-3">
                                {navItems.map((item) => (
                                    <li key={item.title}>
                                        <NavItem
                                            title={item.title}
                                            href={item.href}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
