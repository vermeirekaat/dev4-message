import styles from "./Welcome.module.css";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Welcome({ children }) {
  
  const opacityTransition = {
    hidden: {
      opacity: 0,
      transition: {type: 'spring', stiffness: 120, duration: .4, yoyo: 5}
    },
    visible: {
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, duration: .4, yoyo: 5}
    }
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Cocktail O' Clock</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div className={styles.title}>
        <h1 className={styles.hidden}>Cocktail O'Clock</h1>

        <motion.div className={styles.headerImage}
          variants={opacityTransition}
          initial="hidden"
          animate="visible"
          transition={{delay: 5}}
         >
          <Image src="/assets/letters-white.webp"
                  alt="Cocktail O' Clock"
                  width={654}
                  height={168}
                  />
        </motion.div>
        <motion.div className={styles.headerImage}
          variants={opacityTransition}
          initial="visible"
          animate="hidden"
          transition={{delay: 5}}
          >
          <Image src="/assets/letters-glow.webp"
                  alt="Cocktail O' Clock"
                  width={654}
                  height={168}
                  />
        </motion.div>       
        </div>

      <main className={styles.main}>{children}</main>
    </div>
  );
};