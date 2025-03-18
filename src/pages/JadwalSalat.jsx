import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { HeaderSalat, BannerJadwal } from "@/home";
import { AppContext } from "@/context/AppContext";
import { Sidebar } from "@/components";
import { OptionCities } from "@/constants/optionCities";
import moment from "moment";
import "moment/locale/id";
import { FaCheck, FaTimes } from "react-icons/fa";

const API_TIME = "https://api.aladhan.com/v1/timingsByAddress?address=";

const JadwalSalat = () => {
    const sidebar = useRef("");
    const data = { sidebar };

    const [selectedCity, setSelectedCity] = useState({
        value: "Bandar Lampung",
        label: "Bandar Lampung",
    });

    const [prayerTimes, setPrayerTimes] = useState(null);

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                const formattedCity = selectedCity.value.replace(/\s+/g, "%20"); // Mengganti spasi dengan %20
                const response = await fetch(`${API_TIME}${formattedCity}`);
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

    const isTimePassed = (time) => {
        const now = moment();
        const prayerTime = moment(time, "HH:mm"); // Konversi waktu string ke moment object
        return now.isAfter(prayerTime); // Cek apakah waktu sudah lewat
    };

    const prayerList = [
        { label: "Imsak", time: prayerTimes?.Imsak },
        { label: "Subuh", time: prayerTimes?.Fajr },
        { label: "Terbit", time: prayerTimes?.Sunrise },
        { label: "Dzuhur", time: prayerTimes?.Dhuhr },
        { label: "Ashar", time: prayerTimes?.Asr },
        { label: "Maghrib", time: prayerTimes?.Maghrib },
        { label: "Isya", time: prayerTimes?.Isha },
    ];

    return (
        <AppContext.Provider value={data}>
            <HeaderSalat />
            <Sidebar />
            <BannerJadwal selectedCity={selectedCity} prayerTimes={prayerTimes} />
            <div className="pt-4">
                <h1 className="mb-4 text-center text-[#16a34a]">
                    <p className="text-lg font-bold">{moment().locale("id").format("dddd, D MMMM YYYY")}</p>
                    <p className="text-sm">Kementerian Agama Republik Indonesia</p>
                </h1>
                {/* Searchable Select */}
                <Select
                    className="mb-4"
                    options={OptionCities}
                    value={selectedCity}
                    onChange={(selectedOption) => setSelectedCity(selectedOption)}
                    isSearchable={true}
                />

                {/* Prayer Times Display */}
                {prayerTimes ? (
                    <div className="mt-4 flex flex-col gap-2">
                        {prayerList.map(({ label, time }) => (
                            <div key={label} className="flex justify-between bg-[#16A34A20] p-2 rounded-md">
                                <span>{label}</span>
                                <span className="flex items-center gap-2">
                                    <div>{time}</div>
                                    {isTimePassed(time) ? (
                                        <FaCheck className="border border-green-500 rounded-full text-green-500 p-1 w-5 h-5" />
                                    ) : (
                                        <FaTimes className="border border-red-500 rounded-full text-red-500 p-1 w-5 h-5" />
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </AppContext.Provider>
    );
};

export default JadwalSalat;
