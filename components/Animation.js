import styles from "./Animation.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Animation ({ cocktail }) {

    const ingredientsAr = cocktail.fields.ingredients.split(",");
    const drinksAr = cocktail.fields.beverages.split(",");

    const [rotateBottle, setRotateBottle] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setRotateBottle(true)
        }, 8500);
    })

    const animateIngredients = {
        hidden: { opacity: 0, y: "-10vh" },
        visible: { opacity: 1, y: "20vh" },
        transition: { ease: "easeIn", duration: 4}
    }

    const animateDrinks = {
        initial: { 
            x: 0,
            y: 0, 
            scale: 1
        },
        scale: { 
            x: 0,
            y: "10vh", 
            scale: 1.5,
            transition: { ease: "easeIn", delay: 5, duration: 3, repeat: 1, repeatType: "mirror"}
        },
        rotate: { 
            rotate: -120,
            y: "-20vh", 
            x: "-35vw",
            scale: 1,
            transition: { ease: "easeOut", duration: 5, repeat: 1, repeatType: "mirror"}
        },
    }

    const animateExtra = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }
    

    return (
        <div className={styles.container}>

            <motion.ul className={styles.ingredients}
                        variants={animateIngredients}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 7, delay: 15 }}>
                    {ingredientsAr.map((ingredient) => (
                        <motion.li key={ingredient}  className={styles.ingredientImage}
                                variants={animateExtra}
                                initial="hidden"
                                animate="visible"
                                >
                                <Image 
                                    src={`/assets/${ingredient}.webp`} 
                                    width={100} 
                                    height={100}/>           
                        </motion.li>
                    ))}
                </motion.ul>

            <AnimatePresence>
                { !rotateBottle && (
                     <motion.ul className={styles.drinks} 
                            variants={animateDrinks}
                            initial="initial"
                            animate="scale">
                    {drinksAr.map((drink) => (
                        <motion.li key={drink}  className={styles.drinkImage}>
                                <Image 
                                    src={`/assets/${drink}.webp`} 
                                    width={100} 
                                    height={400}/>           
                        </motion.li>))}
                    </motion.ul>
                )}
                { rotateBottle && (
                    <motion.ul className={styles.drinks} 
                                variants={animateDrinks}
                                initial="initial"
                                animate="rotate"
                                transition={{ duration: 3, delay: 3 }}>
                        {drinksAr.map((drink) => (
                        <motion.li key={drink}  className={styles.drinkImage}>
                                <Image 
                                    src={`/assets/${drink}.webp`} 
                                    width={100} 
                                    height={400}/>           
                        </motion.li>))}
                    </motion.ul>
                )}

            </AnimatePresence>
            

            <motion.div className={styles.glassImage}
                        initial={{ opacity: 0, y:"10vh"}}
                        animate={{ opacity: 1, y: 0}}
                        transition={{ delay: 2, duration: 3, ease: "easeOut"}}
                        >
                <Image 
                    src={"https:" + cocktail.fields.glass.fields.image.fields.file.url} 
                    width={cocktail.fields.glass.fields.image.fields.file.details.image.width} 
                    height={cocktail.fields.glass.fields.image.fields.file.details.image.height}/>           
            </motion.div>

        </div>
    )
}