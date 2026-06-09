import {
    useEffect,
    useState,
} from "react";

import styles from "../styles/form.module.css";
import api from "../services/api";

import MainLayout from "../layouts/MainLayout";

function Vehicles() {
    const [vehicles, setVehicles] =
        useState([]);

    const [form, setForm] =
        useState({
            vehicleId: "",
            driverName: "",
            fuelEfficiency: "",
        });

    const fetchVehicles =
        async () => {
            const res =
                await api.get(
                    "/vehicles"
                );

            setVehicles(res.data);
        };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const addVehicle =
        async (e) => {
            e.preventDefault();

            await api.post(
                "/vehicles",
                form
            );

            setForm({
                vehicleId: "",
                driverName: "",
                fuelEfficiency: "",
            });

            fetchVehicles();
        };

    return (
        <MainLayout>
            <h2>Vehicles</h2>

            <form className={styles.form}
                onSubmit={
                    addVehicle
                }
            >
                <input
                    placeholder="Vehicle ID"
                    value={
                        form.vehicleId
                    }
                    onChange={(e) =>
                        setForm({
                            ...form,
                            vehicleId:
                                e.target
                                    .value,
                        })
                    }
                />

                <input
                    placeholder="Driver"
                    value={
                        form.driverName
                    }
                    onChange={(e) =>
                        setForm({
                            ...form,
                            driverName:
                                e.target
                                    .value,
                        })
                    }
                />

                <input
                    placeholder="Fuel Efficiency"
                    value={
                        form.fuelEfficiency
                    }
                    onChange={(e) =>
                        setForm({
                            ...form,
                            fuelEfficiency:
                                e.target
                                    .value,
                        })
                    }
                />

                <button>
                    Add Vehicle
                </button>
            </form>

            {vehicles.map(
                (vehicle) => (
                    <div key={vehicle._id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            marginBottom: "15px"
                        }}
                    >
                        <h3>{vehicle.vehicleId}</h3>

                        <p>Driver: {vehicle.driverName}</p>

                        <p>Fuel Efficiency: {vehicle.fuelEfficiency}km/l</p>

                        <p>Distance:{vehicle.distanceTravelled?.toFixed(1)}km</p>

                        <p>Fuel Used:{vehicle.fuelConsumed?.toFixed(1)}L</p>

                        <p>Status:{vehicle.status}</p>
                    </div>

                )
            )}
        </MainLayout>
    );
}

export default Vehicles;