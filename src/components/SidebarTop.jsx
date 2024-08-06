import { AiOutlineClose } from "react-icons/ai"

export default function SidebarTop(props) {
    const closeMenu = () => {
        props.sidebar.current.classList.remove('toggle-search')
    }

    return (
        <div className="sidebar-top">
            <h3 className="font-bold text-xl">Menu</h3>
            <AiOutlineClose onClick={closeMenu} />
        </div>
    )
}