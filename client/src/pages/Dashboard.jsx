import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts";
import { PieChart, Pie } from "recharts"
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import styles from "./Dashboard.module.css";
import KpiCard from "../components/KpiCard.jsx";

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [insight, setInsight] = useState("");
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [statsRes, insightsRes] = await Promise.all([
                    api.get("/dashboard/stats"),
                    api.get("/dashboard/insights"),
                ]);

                setStats(statsRes.data);
                setInsight(insightsRes.data.message);
            } catch (error) {
                console.error("Dashboard Error:", error);
            }
        };

        loadData();

        const loadRecommendations =
            async () => {

                const res =
                    await api.get(
                        "/ai/recommendations"
                    );

                setRecommendations(
                    res.data
                );
            };

        loadRecommendations();
    }, []);

    if (!stats) {
        return (
            <MainLayout>
                <h2>Loading...</h2>
            </MainLayout>
        );
    }

    const chartData = [
        {
            name: "Distance",
            value: stats.totalDistance,
        },
        {
            name: "Fuel",
            value: stats.totalFuel,
        },
        {
            name: "Vehicles",
            value: stats.activeVehicles,
        },
    ];

    const pieData = [
        {
            name: "Active",
            value: stats?.statusCounts?.active || 0
        },
        {
            name: "Inactive",
            value: stats?.statusCounts?.inactive || 0
        },
        {
            name: "Maintenance",
            value: stats?.statusCounts?.maintenance || 0
        }
    ];

    return (
        <MainLayout>
            <h1 className={styles.pageTitle}>FleetRouteIQ Dashboard</h1>

            <div className={styles.insightCard}>
                <h3>AI Insight</h3>

                <p>{insight || "No insights available"}</p>
            </div>

            <div className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                    <h3>Active Vehicles</h3>

                    <p> {stats.activeVehicles}</p>
                </div>

                <div className={styles.kpiCard}>
                    <h3>Total Distance</h3>

                    <p>{stats.totalDistance.toFixed(0)}km</p>
                </div>

                <div className={styles.kpiCard}>
                    <h3>Total Fuel Used</h3>

                    <p>{stats.totalFuel.toFixed(0)}L</p>
                </div>

                <div className={styles.kpiCard}>
                    <h3>Fleet Health</h3>

                    <p>{stats.fleetHealth.toFixed(1)}%</p>
                </div>

            </div>

            <div className={styles.chartCard}>
                <ResponsiveContainer
                    width="100%"
                    height={350}
                >
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar dataKey="value" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={350}>
                    <PieChart
                        width={400}
                        height={300}
                    >
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                        />

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                <div className={styles.insightCard}>
                    <h3>AI Recommendations</h3>

                    {
                        recommendations.map((recommendation, index) => (
                            <p key={index}>• {recommendation}</p>
                        )
                        )
                    }
                </div>
            </div>


        </MainLayout>
    );
}

export default Dashboard;