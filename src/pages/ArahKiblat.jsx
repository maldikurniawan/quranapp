import React, { useRef, useState, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { HeaderKiblat } from "@/home";
import { Sidebar } from "@/components";
import { LiaLocationArrowSolid } from "react-icons/lia";
import { FaKaaba } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const ArahKiblat = () => {
    const sidebar = useRef("");
    const data = { sidebar };

    const [location, setLocation] = useState(null);
    const [qiblaDirection, setQiblaDirection] = useState(null);
    const [deviceHeading, setDeviceHeading] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    setLocation({ lat, lon });

                    // Panggil API Aladhan untuk mendapatkan arah kiblat
                    try {
                        const response = await fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lon}`);
                        const data = await response.json();
                        setQiblaDirection(data.data.direction);
                    } catch (error) {
                        console.error("Error mengambil arah kiblat:", error);
                    }
                },
                (error) => {
                    console.error("Error mendapatkan lokasi:", error.message);
                }
            );
        } else {
            console.error("Geolocation tidak didukung di browser ini.");
        }

        // Gunakan DeviceOrientation API untuk mendeteksi arah perangkat
        const handleOrientation = (event) => {
            if (event.alpha !== null) {
                setDeviceHeading(event.alpha);
            }
        };

        window.addEventListener("deviceorientation", handleOrientation);

        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, []);

    // Hitung sudut yang harus ditempuh untuk menghadap kiblat
    const getRotationAngle = () => {
        if (deviceHeading !== null && qiblaDirection !== null) {
            return qiblaDirection - deviceHeading;
        }
        return 0;
    };

    return (
        <AppContext.Provider value={data}>
            <HeaderKiblat />
            <Sidebar />
            <div className="text-center bg-[#16A34A] rounded-xl">
                <h2 className="text-lg font-bold">Arah Kiblat</h2>
                {location ? (
                    <p>Lokasi Anda: {location.lat}, {location.lon}</p>
                ) : (
                    <p>Mendapatkan lokasi...</p>
                )}
                {qiblaDirection !== null ? (
                    <p>Arah Kiblat: {qiblaDirection.toFixed(2)}° dari utara</p>
                ) : (
                    location && <p>Menghitung arah kiblat...</p>
                )}
                {deviceHeading !== null ? (
                    <p>Arah Hadap Perangkat: {deviceHeading.toFixed(2)}°</p>
                ) : (
                    <p>Mendeteksi kompas...</p>
                )}

                {/* Kompas dengan Arrow dan Ka'bah */}
                <div className="relative flex justify-center mt-10 rounded-full">
                    {/* Ka'bah di atas */}
                    <img src="kaaba.svg" className="absolute top-[-36px] z-10 w-[60px] h-[60px]" />

                    {/* Lingkaran Kompas */}
                    <div
                        className="w-60 h-60 border-4 border-black bg-white rounded-full flex items-center justify-center relative"
                    >
                        {/* Arrow (Panah) */}
                        <div
                            className="absolute"
                            style={{
                                transform: `rotate(${getRotationAngle()}deg)`,
                                transition: "transform 0.1s linear",
                            }}
                        >
                            <div className="relative flex justify-center">
                                <BsThreeDotsVertical className="absolute top-[-30px] w-[40px] h-[40px] text-red-500" />
                                <LiaLocationArrowSolid className="h-[120px] w-[120px] text-red-500" />
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-2">Arahkan Panah menghadap Kiblat</p>
            </div>
        </AppContext.Provider>
    );
};

export default ArahKiblat;
