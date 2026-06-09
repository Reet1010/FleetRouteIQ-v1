import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { io } from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../pages/Tracking.module.css";
import { API_URL } from "../config.js";

const roundPushpinIcon = L.divIcon({
    className: "custom-pushpin",
    html: `
    <div style="
      width: 24px;
      height: 24px;
      background-color: #3b82f6;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
      position: relative;
    ">
      <!-- The small sharp point of the pushpin pointing downward -->
      <div style="
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid #3b82f6;
      "></div>
    </div>
  `,
    iconSize: [24, 24],
    iconAnchor: [12, 30], // Anchor point balances the pin right over the coordinate
    popupAnchor: [0, -32], // Determines where the popup box floats relative to the pin
});
const activeIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",

    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",

    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const maintenanceIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",

    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",

    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const inactiveIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",

    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",

    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const getVehicleIcon =
    (status) => {
        if (status === "maintenance") { return maintenanceIcon; }

        else if (status === "inactive") { return inactiveIcon; }

        return activeIcon;
    };

function MapInvalidator() {
    const map = useMap();

    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize(true);
        }, 500);

        window.dispatchEvent(new Event("resize"));

        return () => clearTimeout(timer);
    }, [map]);

    return null;
}

function Tracking() {
    const [vehicles, setVehicles] = useState({});

    useEffect(() => {
        const socket = io(API_URL);

        socket.on("vehicle-location-updated", (data) => {
            setVehicles(
                (prev) => ({
                    ...prev,

                    [data.vehicleId]: {
                        location: data.location,
                        status: data.status,
                    },
                })
            );
        });

        return () => {
            socket.off("vehicle-location-updated");
        };
    }, []);

    return (
        <MainLayout>
            <div className={styles.mapContainer}>
                <h1 className={styles.pageTitle}>
                    Live Tracking
                </h1>
                <div className={styles.topCards}>
                    <div className={styles.kpiCard}>
                        <h3>Tracked Vehicles</h3>
                        <p>{Object.keys(vehicles).length}</p>
                    </div>

                    <div className={styles.kpiCard}>
                        <h3>Status</h3>
                        <p>Live</p>
                    </div>

                    <div className={styles.kpiCard}>
                        <h3>Update Rate</h3>
                        <p>3 sec</p>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginBottom: "10px",
                    }}
                >
                    <span> 🟢 Active</span>
                    <span>🟠 Maintenance</span>
                    <span>⚫ Inactive</span>
                </div>
                <MapContainer
                    center={[28.6139, 77.209]}
                    zoom={8}
                    style={{ height: "650px", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                    />

                    <MapInvalidator />



                    {Object.entries(vehicles).map(([id, vehicle]) => (
                        <Marker key={id}
                            position={[
                                vehicle.location.lat,
                                vehicle.location.lng,
                            ]}
                            icon={getVehicleIcon(vehicle.status)}
                        >
                            <Popup>
                                <strong> {id}</strong>

                                <br />

                                Status:{" "}{vehicle.status}
                            </Popup>
                        </Marker>
                    )
                    )}
                </MapContainer>
            </div>
        </MainLayout>
    );
}

export default Tracking;
