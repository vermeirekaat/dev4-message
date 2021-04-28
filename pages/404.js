import Layout from "../components/Layout";
import styles from "./404.module.css";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function NotFound () {
    
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 4000)
  }, [])

  const opacityTransition = {
    hidden: {
      opacity: 0,
      transition: {type: 'spring', stiffness: 120, duration: .3, repeat: 4, repeatType: "mirror"},
      y: 0,
    },
    visible: {
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, duration: .3, repeat: 4, repeatType: "mirror"},
      y: 0,
    }, 
  }

  return (
        <div className={styles.container}>
            <div className={styles.image}>
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
            </div>
            <div className={styles.content}>
                <h2 className={styles.title}>OOPS</h2>
                <p className={styles.description}>Your Cocktail has been smashed to pieces, it doesn't exist</p>
            </div>
        </div>
  );
}
 