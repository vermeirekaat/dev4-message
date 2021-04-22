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

  const setDelay = e => {
    setTimeout(() => {
      setCurrentStep(e.target.name)
    }, 5000)
  }

  const sliderTransition = {
    initial: {
      x: 0,
      y: 0,
      opacity: 0.5,
    },
    slideIn: {
      x: 0,
      y: 0, 
      opacity: 1,
      transition: {duration: 3}
    }, 
    slideOutLeft: {
      x: "-100vw",
      y: 0,
      opacity: .5,
    }, 
    slideOutRight: {
      x: "100vw",
      y: 0, 
      opacity: .5,
    }
  }

  const opacityTransition = {
    hidden: {
      opacity: 0,
      transition: {type: 'spring', stiffness: 120, duration: .4, repeat: 5, repeatType: "mirror"},
      y: "15vh"
    },
    visible: {
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, duration: .4, repeat: 5, repeatType: "mirror"},
      y: "15vh"
    }, 
    active: {
      opacity: 1, 
      transition: {duration: 1},
      y: 0,
    }
  }


  return (
    <div className={styles.container}>
      <AnimatePresence>
        <motion.div className={styles.left}
          variants={sliderTransition}
          initial="initial"
          animate="slideIn"
          exit="slideOutLeft"
          transition={{duration: 4}}>
        <motion.div className={styles.right}
          variants={sliderTransition}
          initial="initial"
          animate="slideIn"
          exit="slideOutRight"
          transition={{duration: 4}}>
        </motion.div>
        </motion.div>
        
      </AnimatePresence>
      <Head>
        <title>Cocktail O' Clock</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div className={styles.content}>
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
            exit="hidden"
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
  </div>    
  );
};