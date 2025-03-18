import React, { useRef, useState, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { HeaderKiblat } from "@/home";
import { Sidebar } from "@/components";
import { FaLongArrowAltUp } from "react-icons/fa";

const ArahKiblat = () => {
    const sidebar = useRef("");
    const data = { sidebar };

    // State untuk menyimpan lokasi, arah kiblat, dan arah kompas
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
                setDeviceHeading(event.alpha); // event.alpha adalah arah hadap perangkat dalam derajat
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
            <div className="text-center">
                <h2>Arah Kiblat</h2>
                {location ? (
                    <p>Lokasi Anda: {location.lat}, {location.lon}</p>
                ) : (
                    <p>Mendapatkan lokasi...</p>
                )}
                {qiblaDirection !== null ? (
                    <p>Arah Kiblat: {qiblaDirection}° dari utara</p>
                ) : (
                    location && <p>Menghitung arah kiblat...</p>
                )}
                {deviceHeading !== null ? (
                    <p>Arah Hadap Perangkat: {deviceHeading.toFixed(2)}°</p>
                ) : (
                    <p>Mendeteksi kompas...</p>
                )}

                {/* Kompas dengan CSS Rotate */}
                <div className="relative flex justify-center mt-6">
                    <div
                        className="w-32 h-32 border-4 border-gray-500 rounded-full flex items-center justify-center relative"
                        style={{ transform: `rotate(${getRotationAngle()}deg)` }}
                    >
                        <FaLongArrowAltUp className="h-full" />
                    </div>
                </div>
                <p className="mt-2">Putar perangkat hingga ikon 🕌 menghadap ke atas</p>
            </div>
        </AppContext.Provider>
    );
};

export default ArahKiblat;
