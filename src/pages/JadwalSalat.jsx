import React, { useEffect, useRef, useState } from 'react'
import { HeaderSalat } from '@/home'
import { AppContext } from '@/context/AppContext';
import { Sidebar } from "@/components"
import { OptionCities } from '@/constants/optionCities';

const VITE_API_TIME = import.meta.env.VITE_API_TIME;

const JadwalSalat = () => {
    const sidebar = useRef('');
    const data = { sidebar };

    const [selectedCity, setSelectedCity] = useState("Bandar Lampung");
    const [prayerTimes, setPrayerTimes] = useState(null);

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                const response = await fetch(`${VITE_API_TIME}${selectedCity}`);
                const result = await response.json();
                if (result.code === 200) {
                    setPrayerTimes(result.data.timings);
                }
            } catch (error) {
                console.error("Error fetching prayer times:", error);
            }
        };

        fetchPrayerTimes();
    }, [selectedCity]);

    return (
        <AppContext.Provider value={data}>
            <HeaderSalat />
            <Sidebar />
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Jadwal Salat</h1>

                {/* City Selector */}
                <select
                    className="border p-2 rounded mb-4"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                >
                    {OptionCities.map((city) => (
                        <option key={city.value} value={city.value}>
                            {city.label}
                        </option>
                    ))}
                </select>

                {/* Prayer Times Display */}
                {prayerTimes ? (
                    <div className="mt-4">
                        <p>Subuh: {prayerTimes.Fajr}</p>
                        <p>Dzuhur: {prayerTimes.Dhuhr}</p>
                        <p>Ashar: {prayerTimes.Asr}</p>
                        <p>Maghrib: {prayerTimes.Maghrib}</p>
                        <p>Isya: {prayerTimes.Isha}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </AppContext.Provider>
    )
}

export default JadwalSalat