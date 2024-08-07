import { AiOutlineBug, AiOutlineCoffee, AiOutlineFolderOpen, AiOutlineGithub, AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai"
import { FaRegUserCircle } from "react-icons/fa"

export default function SidebarBody() {
    return (
        <div className="sidebar-body">
            <div className="sidebar-body-menu">
                <ul>
                    <li>
                        <AiOutlineCoffee />
                        <a href="/quranapp/">Trakteer coffe</a>
                    </li>
                    <li>
                        <AiOutlineBug />
                        <a href="/quranapp/"> Report bug</a>
                    </li>
                    <li>
                        <AiOutlineFolderOpen />
                        <a href="/quranapp/">This Repository</a>
                    </li>
                </ul>
            </div>
            <div className="sidebar-footer">
                <h3 className="footer-title">Contact me</h3>
                <div className="icons-social">
                    <a href="https://github.com/maldikurniawan" target="_blank"><AiOutlineGithub /></a>
                    <a href="https://api.whatsapp.com/send?phone=62895610107247" target="_blank"><AiOutlineWhatsApp /></a>
                    <a href="https://www.instagram.com/aldiknn_/" target="_blank"><AiOutlineInstagram /></a>
                    <a href="https://maldikurniawan.github.io/random_app/" target="_blank"><FaRegUserCircle /></a>
                </div>
                <h4>Inspired by
                    <a href="https://github.com/ahmdsk/QuranWeb-React" target="_blank"> Ahmad Shaleh</a>
                </h4>
            </div>
        </div>
    )
}