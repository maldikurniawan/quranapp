import React, { useEffect, useState } from "react";
import { FaCity } from "react-icons/fa";

const BannerJadwal = ({ selectedCity, prayerTimes }) => {
    const [nextPrayer, setNextPrayer] = useState(null);
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        if (!prayerTimes) return;

        const calculateNextPrayer = () => {
            const now = new Date();
            const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD

            const prayerTimesArray = [
                { name: "Subuh", time: prayerTimes.Fajr },
                { name: "Dzuhur", time: prayerTimes.Dhuhr },
                { name: "Ashar", time: prayerTimes.Asr },
                { name: "Maghrib", time: prayerTimes.Maghrib },
                { name: "Isya", time: prayerTimes.Isha }
            ];

            // Convert waktu solat ke format Date
            const prayerTimesWithDate = prayerTimesArray.map(prayer => ({
                ...prayer,
                date: new Date(`${today}T${prayer.time}:00`) // Format YYYY-MM-DDTHH:MM:SS
            }));

            // Cari waktu solat terdekat
            const upcomingPrayer = prayerTimesWithDate.find(prayer => prayer.date > now) || prayerTimesWithDate[0];

            setNextPrayer(upcomingPrayer);
        };

        calculateNextPrayer();

        // Perbarui setiap 1 menit agar tetap akurat
        const interval = setInterval(calculateNextPrayer, 60000);

        return () => clearInterval(interval);
    }, [prayerTimes]);

    useEffect(() => {
        if (!nextPrayer) return;

        const updateCountdown = () => {
            const now = new Date();
            const diff = nextPrayer.date - now;

            if (diff <= 0) {
                setCountdown("Waktunya shalat!");
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setCountdown(`${hours}j ${minutes}m ${seconds}d`);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [nextPrayer]);

    return (
        <div className="banner">
            <div className="left-info">
                <div className="container-last-read">
                    <FaCity className="text-xl" />
                    <h3 className="last-read whitespace-nowrap line-clamp-1">{selectedCity.label}</h3>
                </div>
                <div className="container-surah">
                    {nextPrayer ? (
                        <>
                            <div className="surah-name">{nextPrayer.name}</div>
                            <div className="surah-name">{nextPrayer.time}</div>
                            <p className="surah-number">{countdown}</p>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            <div className="absolute top-[-30px] right-[-40px] w-[250px] opacity-50">
                <img src="/mosque.png" alt="Mosque" />
            </div>
        </div>
    );
};

export default BannerJadwal;
