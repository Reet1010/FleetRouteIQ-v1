// import { useState } from "react";
// import api from "../services/api";
// import MainLayout from "../layouts/MainLayout";
// import styles from "./RouteComparison.module.css";


// function RouteComparison() {
//     const [mileage, setMileage] = useState("");

//     const [fuelPrice, setFuelPrice] = useState("");

//     const [data, setData] = useState(null);

//     const routes = [
//         {
//             name: "Route A",
//             distance: 280,
//             trafficFactor: 1.2,
//         },
//         {
//             name: "Route B",
//             distance: 320,
//             trafficFactor: 0.7,
//         },
//         {
//             name: "Route C",
//             distance: 260,
//             trafficFactor: 1.8,
//         },
//     ];

//     const handleCompare = async () => {
//         const res = await api.post("/ai/compare-routes",
//             {
//                 routes,
//                 mileage: Number(mileage),
//                 fuelPrice: Number(fuelPrice),
//             }
//         );

//         setData(res.data);
//     };

//     return (
//         <MainLayout>
//             <div className={styles.container}>
//                 <h1 className={styles.title}>Route Comparison</h1>
//             </div>

//             <input
//                 placeholder="Mileage"
//                 value={mileage}
//                 onChange={(e) => setMileage(e.target.value)}
//             />

//             <input
//                 placeholder="Fuel Price"
//                 value={fuelPrice}
//                 onChange={(e) => setFuelPrice(e.target.value)}
//             />

//             <button onClick={handleCompare}>Compare Routes</button>

//             {data && (
//                 <>
//                     <h3>Best Route: {data.bestRoute.name}</h3>

//                     {data.routes.map((route) => (
//                         <div key={route.name}>
//                             <h4>{route.name}</h4>

//                             <p>Distance:{route.distance}</p>

//                             <p>Fuel: ₹{route.fuelCost.toFixed(2)}</p>

//                             <p>Delay: {route.delay}</p>

//                             <p>Score: {route.score.toFixed(2)}</p>
//                         </div>
//                     )
//                     )}
//                 </>
//             )}
//         </MainLayout>
//     );
// }

// export default RouteComparison;



import { useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import styles from "./RouteComparison.module.css";

function RouteComparison() {
    const [mileage, setMileage] = useState("");
    const [fuelPrice, setFuelPrice] = useState("");
    const [data, setData] = useState(null);

    const routes = [
        {
            name: "Route A",
            distance: 280,
            trafficFactor: 1.2,
        },
        {
            name: "Route B",
            distance: 320,
            trafficFactor: 0.7,
        },
        {
            name: "Route C",
            distance: 260,
            trafficFactor: 1.8,
        },
    ];

    const handleCompare = async () => {
        try {
            const res = await api.post(
                "/ai/compare-routes",
                {
                    routes,
                    mileage: Number(mileage),
                    fuelPrice: Number(fuelPrice),
                }
            );

            setData(res.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <MainLayout>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Route Comparison
                </h1>

                <div className={styles.actions}>
                    <h3>
                        Compare Available Routes
                    </h3>

                    <br />

                    <input
                        className={styles.input}
                        placeholder="Mileage (km/l)"
                        value={mileage}
                        onChange={(e) =>
                            setMileage(
                                e.target.value
                            )
                        }
                    />

                    <input
                        className={styles.input}
                        placeholder="Fuel Price (₹)"
                        value={fuelPrice}
                        onChange={(e) =>
                            setFuelPrice(
                                e.target.value
                            )
                        }
                    />

                    <button
                        onClick={
                            handleCompare
                        }
                        className={
                            styles.button
                        }
                    >
                        Compare Routes
                    </button>
                </div>

                {data && (
                    <>
                        <div
                            className={
                                styles.bestRoute
                            }
                        >
                            <div
                                className={
                                    styles.bestRouteLabel
                                }
                            >
                                🏆 Best Route
                            </div>

                            <div
                                className={
                                    styles.bestRouteName
                                }
                            >
                                {
                                    data
                                        .bestRoute
                                        .name
                                }
                            </div>

                            <div
                                className={
                                    styles.bestRouteScore
                                }
                            >
                                Score:{" "}
                                {
                                    data
                                        .bestRoute
                                        .score
                                        .toFixed(
                                            2
                                        )
                                }
                            </div>
                        </div>

                        <div
                            className={
                                styles.routeGrid
                            }
                        >
                            {data.routes.map(
                                (
                                    route
                                ) => (
                                    <div
                                        key={
                                            route.name
                                        }
                                        className={`
                                            ${styles.routeCard}
                                            ${route.name ===
                                                data.bestRoute.name
                                                ? styles.bestCard
                                                : ""
                                            }
                                        `}
                                    >
                                        <h3
                                            className={
                                                styles.routeName
                                            }
                                        >
                                            {
                                                route.name
                                            }
                                            {route.name ===
                                                data
                                                    .bestRoute
                                                    .name &&
                                                " ⭐"}
                                        </h3>

                                        <div
                                            className={
                                                styles.metric
                                            }
                                        >
                                            <span
                                                className={
                                                    styles.metricLabel
                                                }
                                            >
                                                Distance
                                            </span>

                                            <span
                                                className={
                                                    styles.metricValue
                                                }
                                            >
                                                {
                                                    route.distance
                                                }
                                                km
                                            </span>
                                        </div>

                                        <div
                                            className={
                                                styles.metric
                                            }
                                        >
                                            <span
                                                className={
                                                    styles.metricLabel
                                                }
                                            >
                                                Fuel Cost
                                            </span>

                                            <span
                                                className={
                                                    styles.metricValue
                                                }
                                            >
                                                ₹
                                                {route.fuelCost.toFixed(
                                                    0
                                                )}
                                            </span>
                                        </div>

                                        <div
                                            className={
                                                styles.metric
                                            }
                                        >
                                            <span
                                                className={
                                                    styles.metricLabel
                                                }
                                            >
                                                Delay
                                            </span>

                                            <span
                                                className={
                                                    styles.metricValue
                                                }
                                            >
                                                {route.delay.toFixed(
                                                    0
                                                )}{" "}
                                                mins
                                            </span>
                                        </div>

                                        <div
                                            className={
                                                styles.metric
                                            }
                                        >
                                            <span
                                                className={
                                                    styles.metricLabel
                                                }
                                            >
                                                Score
                                            </span>

                                            <span
                                                className={
                                                    styles.metricValue
                                                }
                                            >
                                                {route.score.toFixed(
                                                    2
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </>
                )}
            </div>
        </MainLayout>
    );
}

export default RouteComparison;