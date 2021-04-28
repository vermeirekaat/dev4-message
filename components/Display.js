import styles from "./Display.module.css";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Display({ handleClickChoice, handleClickExtra }) {

    const transformProps = {
        hidden: {
            opacity: 0,
            y: "25vh"
        },
        visible: {
            opacity: 1,
            y: 0,
        }
    }

    return (
        <>
        <motion.div className={styles.information}
                    initial={{ y: "-5vw", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 3, delayChildren: 1}}>
                <p className={styles.description}>Add some beverages</p>

                <button onClick={(e) => handleClickExtra(e.target.name)} name="third" className={styles.nextButton}>Add Extra's</button>
        </motion.div>
        <div className={styles.buttonDisplay}>
            
        </div>
        <AnimatePresence>
            <motion.div className={styles.display}
                variants={transformProps}
                initial="hidden"
                animate="visible"
                transition={{ type: "tween", duration: 3, ease: "easeOut", staggerChildren: 1 }}
                >
                <div className={styles.liquor}>
                    <button onClick={(e) => handleClickChoice(e.currentTarget.name)} name="liquor" className={styles.button}>
                        <Image src="/assets/ice-liquor.webp"
                            alt="Ice bucket with liquor"
                            width={270}
                            height={310}
                        />
                    </button>
                </div>

                <div className={styles.soda}>
                    <button onClick={(e) => handleClickChoice(e.currentTarget.name)} name="soda" className={styles.button}>
                        <Image src="/assets/ice-sodas.webp"
                            alt="Ice bucket with soda"
                            width={270}
                            height={310}
                        />
                    </button>
                </div>
            </motion.div>   
        </AnimatePresence>
        </>  
    )
}