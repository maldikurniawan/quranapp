import { Link } from "react-router-dom";

export default function HeaderSurah(props) {
    return (
        <div className="topBar">
            <div className="title-home flex items-center">
                <Link to="/home"><img src="../back.svg" alt="" /></Link>
                <span>{props.surah.nama_latin}</span>
            </div>
        </div>
    )
}