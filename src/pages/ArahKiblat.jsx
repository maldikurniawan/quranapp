import React, { useRef, useState, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { HeaderKiblat } from "@/home";
import { Sidebar } from "@/components";
import { FaLocationArrow } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const ArahKiblat = () => {
    const sidebar = useRef("");
    const data = { sidebar };

    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [qiblaDirection, setQiblaDirection] = useState(null);
    const [deviceHeading, setDeviceHeading] = useState(null);
    const [declination, setDeclination] = useState(0); // Koreksi utara sejati

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    setLocation({ lat, lon });

                    // Panggil API Aladhan untuk mendapatkan arah kiblat
                    try {
                        const qiblaResponse = await fetch(`https://api.aladhan.com/v1/qibla/${lat}/${lon}`);
                        const qiblaData = await qiblaResponse.json();
                        setQiblaDirection(qiblaData.data.direction);
                    } catch (error) {
                        console.error("Error mengambil arah kiblat:", error);
                    }

                    // Panggil Nominatim API untuk mendapatkan alamat
                    try {
                        const nominatimResponse = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
                        );
                        const nominatimData = await nominatimResponse.json();
                        setAddress(nominatimData.display_name);
                    } catch (error) {
                        console.error("Error mengambil alamat:", error);
                    }

                    // Ambil declination (koreksi utara sejati)
                    try {
                        const declinationResponse = await fetch(
                            `https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=${lat}&lon1=${lon}&resultFormat=json`
                        );
                        const declinationData = await declinationResponse.json();
                        setDeclination(declinationData.result[0].declination);
                    } catch (error) {
                        console.error("Error mengambil declination:", error);
                    }
                },
                (error) => {
                    console.error("Error mendapatkan lokasi:", error.message);
                }
            );
        } else {
            console.error("Geolocation tidak didukung di browser ini.");
        }

        // Minta izin sensor di Chrome
        if (typeof DeviceOrientationEvent.requestPermission === "function") {
            DeviceOrientationEvent.requestPermission()
                .then((permissionState) => {
                    if (permissionState === "granted") {
                        window.addEventListener("deviceorientation", handleOrientation);
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener("deviceorientation", handleOrientation);
        }

        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, []);

    // Handler untuk mendapatkan arah perangkat
    const handleOrientation = (event) => {
        const heading = event.webkitCompassHeading ?? event.alpha; // Gunakan webkitCompassHeading untuk iOS
        if (heading !== null) {
            setDeviceHeading(heading);
        }
    };

    // Hitung sudut rotasi untuk menghadap kiblat dengan koreksi utara sejati
    const getRotationAngle = () => {
        if (deviceHeading !== null && qiblaDirection !== null) {
            return qiblaDirection - (deviceHeading + declination);
        }
        return 0;
    };

    return (
        <AppContext.Provider value={data}>
            <HeaderKiblat />
            <Sidebar />
            <div className="text-center text-white bg-[#16A34A] rounded-xl p-4">
                {address && <p className="font-medium">📍 {address}</p>}
                {qiblaDirection !== null ? (
                    <div className="py-2">
                        <p className="pb-2">Derajat Sudut Kiblat dari Utara</p>
                        <p className="font-semibold text-xl">{qiblaDirection.toFixed(2)}°</p>
                    </div>
                ) : (
                    location && <p>Menghitung arah kiblat...</p>
                )}
                {deviceHeading !== null ? (
                    <div className="pb-10">
                        <p className="pb-2">Arah Perangkat</p>
                        <p className="font-semibold text-xl"> {deviceHeading.toFixed(2)}°</p>
                    </div>
                ) : (
                    <p className="pb-4">Mendeteksi kompas...</p>
                )}

                {/* Kompas dengan Arrow dan Ka'bah */}
                <div className="relative flex justify-center my-10 rounded-full">
                    {/* Ka'bah di atas */}
                    <img src="kaaba.svg" className="absolute top-[-40px] z-10 w-[50px] h-[50px]" alt="Ka'bah" />

                    {/* Lingkaran Kompas */}
                    <div
                        className="w-60 h-60 border-4 border-black bg-white rounded-full flex items-center justify-center relative"
                    >
                        <img src="compas.png" alt="Kompas" className="p-2 opacity-50" />
                        {/* Arrow (Panah) */}
                        <div
                            className="absolute"
                            style={{
                                transform: `rotate(${getRotationAngle()}deg)`,
                                transition: "transform 0.1s linear",
                            }}
                        >
                            <div className="relative flex justify-center">
                                <BsThreeDotsVertical className="absolute top-[-60px] w-[40px] h-[40px] text-red-600" />
                                <FaLocationArrow className="h-[80px] w-[80px] text-red-600 -rotate-45" />
                            </div>
                        </div>
                    </div>
                </div>
                <p className="border rounded-xl bg-white text-[#16A34A] font-medium">Arahkan Panah menghadap Kiblat</p>
            </div>
        </AppContext.Provider>
    );
};

export default ArahKiblat;
