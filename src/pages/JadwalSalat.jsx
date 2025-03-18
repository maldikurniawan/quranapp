import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { HeaderSalat, BannerJadwal } from "@/home";
import { AppContext } from "@/context/AppContext";
import { Sidebar } from "@/components";
import { OptionCities } from "@/constants/optionCities";
import moment from "moment";
import "moment/locale/id";

const VITE_API_TIME = import.meta.env.VITE_API_TIME;

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
                const response = await fetch(`${VITE_API_TIME}${formattedCity}`);
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
            <BannerJadwal selectedCity={selectedCity} prayerTimes={prayerTimes} />
            <div className="pt-4">
                <h1 className="text-lg font-bold mb-4 text-center text-[#16a34a] ">
                    {moment().locale("id").format("dddd, D MMMM YYYY")}
                </h1>
                {/* Searchable Select */}
                <Select
                    className="mb-4"
                    options={OptionCities}
                    value={selectedCity}
                    onChange={(selectedOption) => setSelectedCity(selectedOption)}
                    isSearchable={true} // Aktifkan pencarian
                />

                {/* Prayer Times Display */}
                {prayerTimes ? (
                    <div className="mt-4 flex flex-col gap-2">
                        <div className="flex justify-between bg-[#16A34A20] p-2 rounded-md">
                            <span>Imsak</span> <span>{prayerTimes.Imsak}</span>
                        </div>
                        <div className="flex justify-between bg-[#16A34A20] p-2 rounded-md">
                            <span>Subuh</span> <span>{prayerTimes.Fajr}</span>
                        </div>
                        <div className="flex justify-between bg-[#16A34A20] p-2 rounded-md">
                            <span>Terbit</span> <span>{prayerTimes.Sunrise}</span>
                        </div>
                        <div className="flex justify-between bg-[#16A34A20] p-2 rounded-md">
                            <span>Dzuhur</span> <span>{prayerTimes.Dhuhr}</span>
                        </div>
                        <div className="flex justify-between bg-[#16A34A20] p-2 rounded-md">
                            <span>Ashar</span> <span>{prayerTimes.Asr}</span>
                        </div>
                        <div className="flex justify-between bg-[#16A34A20] p-2 rounded-md">
                            <span>Maghrib</span> <span>{prayerTimes.Maghrib}</span>
                        </div>
                        <div className="flex justify-between bg-[#16A34A20] p-2 rounded-md">
                            <span>Isya</span> <span>{prayerTimes.Isha}</span>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </AppContext.Provider>
    );
};

export default JadwalSalat;
