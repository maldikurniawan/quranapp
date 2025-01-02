import { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "@/context/AppContext"

export default function HeaderHome() {
    const apps = useContext(AppContext)

    const openSeachBar = () => {
        apps.searchInput.current.classList.toggle('toggle-search')
    }

    const openMenu = () => {
        apps.sidebar.current.classList.add('toggle-search');
        document.body.style.overflow = 'hidden';
    }

    return (
        <div className="topBar">
            <span onClick={openMenu} className="hidden max-[460px]:block">
                <img src="/menu-2-line.svg" alt="" />
            </span>
            <div className="title-home">
                <Link to="/">Quran App</Link>
            </div>
            <span onClick={openSeachBar}>
                <img src="/search-line.svg" alt="Search" />
            </span>
        </div>
    )
}