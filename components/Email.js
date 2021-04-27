import styles from "./Email.module.css";

export default function Email ({ onSubmit }) {

    const handleSubmitEmail = (e) => {
        e.preventDefault(); 

        const data = {
            email: e.target.email.value,
        }

        onSubmit(data);
    }

    return (
        <div className={styles.container}>
        <h2 className={styles.title}>Send your virtual cocktail</h2>

        <form className={styles.mail} onSubmit={(e) => handleSubmitEmail(e)}>

            <label className={styles.label}> Your friend's email
                <input className={styles.input} type="email" name="email" required placeholder="name@email.com"/>
            </label>

            <input className={styles.submitButton} type="submit" value="Send"/>
        </form>
    </div>
    )
}