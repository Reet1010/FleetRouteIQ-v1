import { Link } from "react-router-dom";
import styles from "./MainLayout.module.css";

function MainLayout({ children }) {
    return (
        <div className={styles.container} >
            <aside className={styles.sidebar} >
                <h2 className={styles.logo}>FleetRouteIQ</h2>

                <nav className={styles.nav}>
                    <p>
                        <Link className={styles.link} to="/dashboard">Dashboard</Link>
                    </p>

                    <p>
                        <Link className={styles.link} to="/vehicles">Vehicles</Link>
                    </p>

                    <p>
                        <Link className={styles.link} to="/tracking">Tracking</Link>
                    </p>

                    <p>
                        <Link className={styles.link} to="/analysis">Route Analysis</Link>
                    </p>

                    <p>
                        <Link className={styles.link} to="/compare-routes">Compare Routes</Link>
                    </p>
                </nav>
            </aside>

            <main className={styles.content}> {children} </main>
        </div>
    );
}

export default MainLayout;