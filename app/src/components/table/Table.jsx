import styles from "./Table.module.css";

export default function Table({ data }) {
    console.log(styles)
  return (
    <table className={styles.root}>
      <thead>
        <tr className={styles.row}>
          {Object.keys(data[0]).map((key) => (
            <th key={key} className={styles.col}>
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({ EmpId, ProjectID, DateFrom, DateTo }) => {
          return (
            <tr
              key={`${EmpId}-${ProjectID}-${DateFrom}-${DateTo}`}
              className={styles.row}
            >
              <th className={styles.col}>{EmpId}</th>
              <th className={styles.col}>{ProjectID}</th>
              <th className={styles.col}>{DateFrom}</th>
              <th className={styles.col}>{DateTo}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
