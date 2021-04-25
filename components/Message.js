import styles from "./Message.module.css";

export default function Message () {
    return (
        <div className={styles.container}>
            <div className={styles.intro}>
                <h2 className={styles.title}>Your Toast</h2>
                <p className={styles.description}>Let's toast to a better future where we can actually drink cocktails in real life.</p>
            </div>
        </div>
    )
}