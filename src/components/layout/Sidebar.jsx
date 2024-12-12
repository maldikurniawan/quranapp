import { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import SidebarBody from "./SidebarBody";
import SidebarTop from "./SidebarTop";

export default function Sidebar() {
    const apps = useContext(AppContext);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 460) {
                closeMenu();
            }
        };

        // Attach resize event listener
        window.addEventListener("resize", handleResize);

        // Initial check if the window is larger than 460px
        if (window.innerWidth > 460) {
            closeMenu();
        }

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const closeMenu = () => {
        if (apps.sidebar.current) {
            apps.sidebar.current.classList.remove("toggle-search");
        }
    };

    return (
        <div className="sidebar" ref={apps.sidebar}>
            <SidebarTop sidebar={apps.sidebar} />
            <SidebarBody />
        </div>
    );
}
