import {
    AiOutlineFolderOpen,
    AiOutlineGithub,
    AiOutlineInstagram,
    AiOutlineWhatsApp,
} from "react-icons/ai"
import { LuBookOpenText, LuHandHelping } from "react-icons/lu";
import { FaRegSun, FaRegUserCircle } from "react-icons/fa"
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdOutlineMosque } from "react-icons/md";

export default function SidebarBody() {
    return (
        <div className="sidebar-body">
            <div className="sidebar-body-menu">
                <ul>
                    <li className="border-b-2">
                        <LuBookOpenText />
                        <Link to="/">Al-Qur'an</Link>
                    </li>
                    <li className="border-b-2">
                        <LuHandHelping />
                        <Link to="/doa">Do'a Harian</Link>
                    </li>
                    <li className="border-b-2">
                        <FaRegSun />
                        <Link to="/husna">Asmaul Husna</Link>
                    </li>
                    <li className="border-b-2">
                        <IoMdTime />
                        <Link to="/jadwal">Jadwal Salat</Link>
                    </li>
                    <li className="border-b-2">
                        <MdOutlineMosque />
                        <Link to="/kiblat">Arah Kiblat</Link>
                    </li>
                    <li className="border-b-2">
                        <AiOutlineFolderOpen />
                        <a href="https://github.com/maldikurniawan/quranapp" target="_blank">This Repository</a>
                    </li>
                </ul>
            </div>
            <div className="sidebar-footer">
                <h3 className="footer-title">Contact me</h3>
                <div className="icons-social">
                    <a href="https://github.com/maldikurniawan" target="_blank"><AiOutlineGithub /></a>
                    <a href="https://api.whatsapp.com/send?phone=62895610107247" target="_blank"><AiOutlineWhatsApp /></a>
                    <a href="https://www.instagram.com/aldiknn_/" target="_blank"><AiOutlineInstagram /></a>
                    <a href="https://maldikurniawan.netlify.app/" target="_blank"><FaRegUserCircle /></a>
                </div>
                <h4>Inspired by
                    <a href="https://github.com/ahmdsk/QuranWeb-React" target="_blank"> Ahmad Shaleh</a>
                </h4>
            </div>
        </div>
    )
}