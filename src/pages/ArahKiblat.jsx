import React, { useRef } from 'react'
import { AppContext } from "@/context/AppContext";
import { HeaderKiblat } from "@/home";
import { Sidebar } from "@/components";

const ArahKiblat = () => {
    const sidebar = useRef("");
    const data = { sidebar };

    return (
        <AppContext.Provider value={data}>
            <HeaderKiblat />
            <Sidebar />
            <div>
                Arah Kiblat
            </div>
        </AppContext.Provider>
    )
}

export default ArahKiblat