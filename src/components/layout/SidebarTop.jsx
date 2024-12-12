import { AiOutlineClose } from "react-icons/ai"

export default function SidebarTop(props) {
    const closeMenu = () => {
        props.sidebar.current.classList.remove('toggle-search')
    }

    return (
        <div className="sidebar-top">
            <h3 className="font-bold text-xl">Menu</h3>
            <AiOutlineClose onClick={closeMenu} className="cursor-pointer hover:bg-white hover:text-green-600 rounded-full p-1 w-8 h-8" />
        </div>
    )
}