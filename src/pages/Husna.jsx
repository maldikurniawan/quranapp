import React, { useEffect, useRef, useState } from 'react'
import { Sidebar } from '@/components';
import { HeaderHusna, SearchHusna } from '@/home';
import { AppContext } from '@/context/AppContext';
import asHusna from "@/constants/husna.json"
import { FaArrowCircleUp } from 'react-icons/fa';

const Husna = () => {
    const sidebar = useRef('');
    const searchHusna = useRef('');
    const [searchTerm, setSearchTerm] = useState("");
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const data = {
        sidebar,
        searchHusna,
    };

    // Jika husna.json berupa array langsung
    const asmaulHusna = asHusna;

    // Filter data berdasarkan input pencarian
    const filteredLatin = asmaulHusna.filter((latin) =>
        latin.latin.toLowerCase().includes(searchTerm.toLowerCase())
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
            <HeaderHusna />
            <Sidebar />
            <SearchHusna onSearch={setSearchTerm} />
            <div className='grid grid-cols-2 gap-4'>
                {filteredLatin.map((latin) => (
                    <div className="ayat" key={latin.id}>
                        <div className="number-page">
                            <span>{latin.id}</span>
                        </div>
                        <div className="ayat-latin">
                            <h3 className="font-amiri font-bold">{latin.arab}</h3>
                        </div>
                        <div className="ayat-tr">
                            <h3 className="text-[16px] font-bold mb-2">{latin.latin}</h3>
                        </div>
                        <div className="ayat-idn">
                            <p>{latin.indo}</p>
                        </div>
                    </div>
                ))}
            </div>
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

export default Husna