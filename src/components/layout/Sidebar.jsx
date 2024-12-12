import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "@/context/AppContext";
import SidebarBody from "./SidebarBody";
import SidebarTop from "./SidebarTop";
import { useOnClickOutside } from "..//hooks/useOnClickOutside"; // Import the hook

export default function Sidebar() {
    const apps = useContext(AppContext);
    const sidebarRef = useRef(null);

    // Define closeMenu function before using it in the hook
    const closeMenu = () => {
        if (apps.sidebar.current) {
            apps.sidebar.current.classList.remove("toggle-search");
            document.body.style.overflow = '';
        }
    };

    // Call the useOnClickOutside hook and close the menu when clicking outside
    useOnClickOutside(sidebarRef, closeMenu);

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

    return (
        <div className="sidebar bg-[#16a34a] z-20" ref={apps.sidebar}>
            <div ref={sidebarRef}>
                <SidebarTop sidebar={apps.sidebar} />
                <SidebarBody />
            </div>
        </div>

    );
}
