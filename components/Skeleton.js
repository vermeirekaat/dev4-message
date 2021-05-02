import styles from "./Skeleton.module.css";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from 'react';

export default function Skeleton () {

  const [headerImage, setHeaderImage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHeaderImage(false);
    }, 1500); 
  }, []);

  const opacityTransition = {
    hidden: {
      opacity: 0,
      transition: {type: 'spring', stiffness: 120, duration: .3, repeat: 2, repeatType: "mirror"},
      y: "20vh",
    },
    visible: {
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, duration: .3, repeat: 2, repeatType: "mirror"},
      y: "20vh",
    }, 
    active: {
      opacity: 1, 
      transition: {duration: 1},
      y: 0,
    }
  }

  return (
        <div className={styles.container}>
            <div className={styles.image}>
              <AnimatePresence>
                {headerImage &&
                <>
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
                    </motion.div>
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
                    </>}
                {!headerImage &&
                    <motion.div className={styles.headerImage}
                    key="glow"
                    variants={opacityTransition}
                    initial="visible"
                    animate="active"
                    >
                    <Image src="/assets/letters-white.webp"
                            alt="Cocktail O' Clock"
                            width={654}
                            height={168}
                            />
                  </motion.div>}
              </AnimatePresence>
            </div>
            <motion.div className={styles.content}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition= {{duration: 2, delay: 1.5, delayChildren: .5}}>
                <h2 className={styles.title}>OOPS</h2>
                <p className={styles.description}>Someone else drank your cocktail, it doesn't exist.</p>
            </motion.div>
        </div>
  );
}
 