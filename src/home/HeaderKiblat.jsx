import { useContext } from "react"
import { AppContext } from "@/context/AppContext"

const HeaderKiblat = () => {
    const apps = useContext(AppContext)

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
                Arah Kiblat
            </div>
        </div>
    )
}

export default HeaderKiblat