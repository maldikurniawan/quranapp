import { useContext } from "react"
import { AppContext } from "@/context/AppContext"

const HeaderHusna = () => {
    const apps = useContext(AppContext)

    const openSeachBar = () => {
        apps.searchHusna.current.classList.toggle('toggle-search')
    }

    const openMenu = () => {
        apps.sidebar.current.classList.add('toggle-search');
        document.body.style.overflow = 'hidden';
    }

    return (
        <div className="topBar">
            <span onClick={openMenu} className="hidden max-[460px]:block cursor-pointer">
                <img src="/menu-2-line.svg" alt="" />
            </span>
            <div className="title-home">
                Asmaul Husna
            </div>
            <span onClick={openSeachBar} className="cursor-pointer">
                <img src="/search-line.svg" alt="Search" />
            </span>
        </div>
    )
}

export default HeaderHusna