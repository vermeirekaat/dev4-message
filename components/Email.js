import { AnimatePresence, motion } from "framer-motion";
import styles from "./Email.module.css";

export default function Email ({ onSubmit }) {

    const handleSubmitEmail = (e) => {
        e.preventDefault(); 

        const data = {
            email: e.target.email.value,
        }

        onSubmit(data);
    }

    const transformProps = {
        hidden: {
            opacity: 0,
            y: "25vh"
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    }

    return (
        <AnimatePresence>
            <motion.div className={styles.container}
            variants={transformProps}
            initial="hidden"
            animate="visible"
            exit={{y: "50vw", opacity: 0}}
            transition={{ type: "tween", duration: 3, ease: "easeOut", staggerChildren: 1 }}>
                <h2 className={styles.title}>Send your virtual cocktail</h2>

                <form className={styles.mail} onSubmit={(e) => handleSubmitEmail(e)}>

                <label className={styles.label}> Your friend's email
                    <input className={styles.input} type="email" name="email" required placeholder="name@email.com"/>
                </label>

                <motion.input className={styles.submitButton} type="submit" value="Send"
                    initial={{ y: "-2vw", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition= {{duration: 2, delay: 4}}/>
            </form>
        </motion.div>
    </AnimatePresence>
    )
}