import { useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import styles from "../styles/form.module.css"
// import styles from
import Card from "../components/Card.jsx";

function RouteAnalysis() {
    const [form, setForm] = useState({
        distance: "",
        mileage: "",
        fuelPrice: "",
        trafficFactor: "",
    });

    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await api.post("/ai/analyze", {
            distance: Number(form.distance),

            mileage: Number(form.mileage),

            fuelPrice: Number(form.fuelPrice),

            trafficFactor: Number(form.trafficFactor),

        }
        );

        setResult(res.data);
    };

    return (
        <MainLayout>
            <h2>Route Analysis</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    placeholder="Distance"
                    value={form.distance}
                    onChange={(e) => setForm({ ...form, distance: e.target.value, })}
                />

                <input
                    placeholder="Mileage"
                    value={form.mileage}
                    onChange={(e) => setForm({ ...form, mileage: e.target.value, })}
                />

                <input
                    placeholder="Fuel Price"
                    value={form.fuelPrice}
                    onChange={(e) => setForm({ ...form, fuelPrice: e.target.value, })}
                />

                <input
                    placeholder="Traffic Factor"
                    value={form.trafficFactor}
                    onChange={(e) => setForm({ ...form, trafficFactor: e.target.value, })}
                />

                <button>Analyze</button>
            </form>

            {result && (
                <div className={styles.resultsGrid}>
                    <Card>
                        <h3>Fuel Cost: ₹{result.fuelCost.toFixed(2)}</h3>
                    </Card>

                    <Card>
                        <h3>Delay: {result.delay}</h3>
                    </Card>

                    <Card>
                        <h3>Route Score: {result.score}</h3>
                    </Card>

                    <Card>
                        <h3>Recommendation: {result.recommendation}</h3>
                    </Card>
                </div>
            )}
        </MainLayout>
    );
}

export default RouteAnalysis;