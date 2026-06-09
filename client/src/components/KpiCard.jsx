import styles
    from "./KpiCard.module.css";

function KpiCard({
    title,
    value,
}) {
    return (
        <div className={styles.card}>
            <h4>{title}</h4>

            <h2>{value}</h2>
        </div>
    );
}

export default KpiCard;