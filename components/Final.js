import styles from "./Final.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Final ({ cocktail }) {
    return (
        <div className={styles.container}>
              <motion.div className={styles.button}
                    initial={{ opacity: 0, y: -100}}
                    animate={{opacity: 1, y: 0}}
                    transition= {{duration: 2, delay: 6}}>
                <Link href="/"> 
                    <a className={styles.homeButton}>Make your own virtual cocktail</a>                
                </Link>
            </motion.div>
            
            <motion.div className={styles.image}
                        initial={{ opacity: 1, y: 0, x: 0 }}
                        animate={{ opacity: 1, y: 0, x: "-20vw",}}
                        transition={{ delay: .7, ease:"easeOut", duration: 3}}>
                    <Image 
                        src={"https:" + cocktail.fields.glass.fields.image.fields.file.url} 
                        width={cocktail.fields.glass.fields.image.fields.file.details.image.width} 
                        height={cocktail.fields.glass.fields.image.fields.file.details.image.height}
                        />
            </motion.div>

            <motion.div className={styles.content}
                        initial={{ x: 0, y: "-3.5vh", opacity: 0}}
                        animate={{ x: "-30vw", y: "-3.5vh", opacity: 1}}
                        transition={{ duration: 4 }}>
                <motion.p className={styles.subtitle}
                             initial={{ y: "-10vh", opacity: 0}}
                             animate={{ y: 0, opacity: 1}}
                             transition={{ duration: 1, delay: 5 }}>
                            Cheers!</motion.p>
                <p className={styles.item}>To: {cocktail.fields.receiver}</p>
                <div className={styles.messageContainer}>
                <p className={styles.message}>{cocktail.fields.message}</p>
                </div>
                
                <p className={styles.item}>From: {cocktail.fields.sender}</p>
            </motion.div>
        </div>
    )
}