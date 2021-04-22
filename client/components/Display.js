import styles from "./Display.module.css";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Display({ handleClick }) {

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
        <AnimatePresence>
            <motion.div className={styles.display}
                variants={transformProps}
                initial="hidden"
                animate="visible"
                transition={{ type: "tween", duration: 3, ease: "easeOut", staggerChildren: 1 }}
                >
                <div className={styles.liquor}>
                    <button onClick={(e) => handleClick(e.currentTarget.name)} name="liquor" className={styles.button}>
                        <Image src="/assets/ice-liquor.webp"
                            alt="Ice bucket with liquor"
                            width={270}
                            height={310}
                        />
                    </button>
                </div>

                <div className={styles.soda}>
                    <button onClick={(e) => handleClick(e.currentTarget.name)} name="soda" className={styles.button}>
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