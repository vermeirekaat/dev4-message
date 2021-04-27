import Layout from "../../components/Layout";
import styles from "./Success.module.css";

export default function Success({ }) {

    return (
        <Layout>
            <div className={styles.container}>
                <h2 className={styles.title}>Your cocktail is being made</h2>
                <p className={styles.information}>Send a private link to your friend</p>

                <form className={styles.mail}>

                    <label className={styles.label}> Your friend's email
                        <input className={styles.input} type="email" required placeholder="name@email.com"/>
                    </label>

                    <input className={styles.submitButton} type="submit" value="Send"/>

                </form>
            </div>
        </Layout>
    )
}