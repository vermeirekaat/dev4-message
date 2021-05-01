import styles from "./Final.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Final ({ cocktail }) {
    return (
        <div className={styles.overview}>
            <div className={styles.input}>
                        <motion.div className={styles.image}
                                    initial={{ y: 0, x: "15vw", scale: 1, opacity: 1 }}
                                    animate={{ y: 0, x: 0, scale: 1, opacity: 1}}
                                    transition={{ delay: .7, ease:"easeOut", duration: 3}}>
                            <Image 
                                src={"https:" + cocktail.fields.glass.fields.image.fields.file.url} 
                                width={cocktail.fields.glass.fields.image.fields.file.details.image.width} 
                                height={cocktail.fields.glass.fields.image.fields.file.details.image.height}
                            />
                        </motion.div>
            </div>

            <motion.div className={styles.content}
                        initial={{ x: "15vh", opacity: 0}}
                        animate={{ x: 0, opacity: 1}}
                        transition={{ duration: 4 }}>
                <p className={styles.item}>To: {cocktail.fields.receiver}</p>
                <div className={styles.messageContainer}>
                <p className={styles.message}>{cocktail.fields.message}</p>
                </div>
                
                <p className={styles.item}>From: {cocktail.fields.sender}</p>
            </motion.div>
        </div>
    )
}