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
        <div className={styles.information}>
                <motion.p className={styles.description}
                initial={{ y: "-5vw", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 3, delayChildren: 1}}>Add some beverages</motion.p>

                <motion.button onClick={(e) => handleClickExtra(e.target.name)} 
                                initial={{ y: "-5vw", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition= {{duration: 2, delay: 6}}
                                name="third" 
                                className={styles.nextButton}
                >Add Extra's
                </motion.button>
        </div>

        <AnimatePresence>
            <motion.div className={styles.display}
                variants={transformProps}
                initial="hidden"
                animate="visible"
                transition={{ type: "tween", duration: 3, ease: "easeOut"}}
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