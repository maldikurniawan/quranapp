import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export default function SearchHusna({ onSearch }) {
    const apps = useContext(AppContext);

    return (
        <div className="seacrhBar" ref={apps.searchHusna}>
            <input
                type="text"
                placeholder="Search Doa..."
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}
