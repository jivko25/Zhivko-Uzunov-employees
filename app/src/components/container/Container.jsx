import styles from "./Container.module.css";

export default function Table({ children }) {
  return <div className={styles.root}>{children}</div>;
}
