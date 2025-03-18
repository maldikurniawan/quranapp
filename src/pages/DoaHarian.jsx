import React, { useEffect, useRef, useState } from 'react'
import { Sidebar } from '@/components';
import { HeaderDoa, SearchDoa } from '@/home';
import { AppContext } from '@/context/AppContext';
import doaData from "@/constants/doaHarian.json"
import { FaArrowCircleUp } from 'react-icons/fa';

const DoaHarian = () => {
    const sidebar = useRef('');
    const searchDoa = useRef('');
    const [searchTerm, setSearchTerm] = useState("");
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const data = {
        sidebar,
        searchDoa,
    };

    // Jika doaHarian.json berupa array langsung
    const doaHarian = doaData;

    // Filter data berdasarkan input pencarian
    const filteredDoa = doaHarian.filter((doa) =>
        doa.doa.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AppContext.Provider value={data}>
            <HeaderDoa />
            <Sidebar />
            <SearchDoa onSearch={setSearchTerm} />
            {filteredDoa.map((doa) => (
                <div className="ayat" key={doa.id}>
                    <div className="number-page flex gap-2 items-center">
                        <span>{doa.id}</span>
                        <p className='text-[#16a34a] font-bold'>{doa.doa}</p>
                    </div>
                    <div className="ayat-latin">
                        <h3 className="font-amiri font-bold">{doa.ayat}</h3>
                    </div>
                    <div className="ayat-tr">
                        <h3 className="text-[16px] font-bold mb-2">{doa.latin}</h3>
                    </div>
                    <div className="ayat-idn">
                        <p>{doa.artinya}</p>
                    </div>
                </div>
            ))}
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className='opacity-90'
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        color: '#16a34a',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                    <FaArrowCircleUp className='w-10 h-10' />
                </button>
            )}
        </AppContext.Provider>
    )
}

export default DoaHarian