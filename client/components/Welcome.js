import styles from "./Welcome.module.css";
import Head from "next/head";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Welcome({ children }) {

  const [headerImage, setHeaderImage] = useState(true);

  setTimeout(() => {
    setHeaderImage(false)
  }, 3000);

  const opacityTransition = {
    hidden: {
      opacity: 0,
      transition: {type: 'spring', stiffness: 120, duration: .4, repeat: 5, repeatType: "mirror"},
      y: "25vh"
    },
    visible: {
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, duration: .4, repeat: 5, repeatType: "mirror"},
      y: "25vh"
    }, 
    active: {
      opacity: 1, 
      transition: {duration: 1},
      y: 0,
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

      <AnimatePresence>
        {headerImage && 
            <motion.div className={styles.headerImage}
            key="white"
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
        }
        {headerImage &&
            <motion.div className={styles.headerImage}
            key="glow"
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
          </motion.div>}
          {!headerImage &&
            <motion.div className={styles.headerImage}
            key="glow"
            variants={opacityTransition}
            initial="visible"
            animate="active"
            >
            <Image src="/assets/letters-glow.webp"
                    alt="Cocktail O' Clock"
                    width={654}
                    height={168}
                    />
          </motion.div>}
      </AnimatePresence>

      </div>

      <main className={styles.main}>{children}</main>
    </div>
  );
};