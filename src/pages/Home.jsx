import { useEffect, useRef, useState } from 'react';
import {
    Sidebar,
    Loading,
} from '@/components';
import BannerHome from '../home/BannerHome';
import HeaderHome from '../home/HeaderHome';
import InputSearchHome from '../home/InputSearchHome';
import ListSurahHome from '../home/ListSurahHome';
import { AppContext } from '@/context/AppContext';
import { FaArrowCircleUp } from 'react-icons/fa';

export default function Home() {
    const [surah, setSurah] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [lastRead, setLastRead] = useState({});
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const sidebar = useRef('');
    const searchInput = useRef('');

    document.title = 'Quran App';

    useEffect(() => {
        async function getAllSurah() {
            const request = await fetch('https://equran.id/api/surat');
            const response = await request.json();

            setSurah(response);
            setLoading(false);
        }

        getAllSurah();

        const lastSurah = JSON.parse(localStorage.getItem('lastRead'));
        lastSurah ? setLastRead(lastSurah) : setLastRead({});

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

    const data = {
        sidebar,
        searchInput,
        lastRead,
        search,
        setSearch,
        surah
    };

    return (
        <AppContext.Provider value={data}>
            <HeaderHome />
            <Sidebar />
            <InputSearchHome />
            <BannerHome />
            {loading ? <Loading /> : <ListSurahHome />}
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className='opacity-70'
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
    );
}
