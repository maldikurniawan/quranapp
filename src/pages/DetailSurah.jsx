import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import 'react-h5-audio-player/lib/styles.css'
import { Loading } from "@/components";
import HeaderSurah from '../surah/HeaderSurah';
import BannerSurah from '../surah/BannerSurah';
import ListAyat from '../surah/ListAyat';
import MurotalSurah from '../surah/MurotalSurah';
export default function DetailSurah() {
    const params = useParams()

    const [surah, setSurah] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getSurah() {
            const request = await fetch(`https://equran.id/api/surat/${params?.nomor}`);
            const response = await request.json();

            setSurah(response)
            setLoading(false)

            document.title = `${response.nama_latin} | Quran App`
        }

        getSurah()

        localStorage.setItem('lastRead', JSON.stringify({
            'nama_latin': surah.nama_latin,
            'nomor': surah.nomor
        }));

    }, [params, surah]);

    return (
        <>
            <HeaderSurah surah={surah} />
            <BannerSurah surah={surah} />
            {loading ? <Loading /> : <ListAyat surah={surah} />}
            <MurotalSurah surah={surah} />
        </>
    )
}