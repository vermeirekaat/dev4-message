import styles from "./Drinks.module.css";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Drinks ({ drinks, onSubmit, handleClick }) {

    const [bottle, setBottle] = useState([]);

    const handleClickBottle = (e) => {
        const choice = e.currentTarget.name;

        const newChoice = drinks.filter((item) => item.fields.name === choice);
        setBottle(newChoice);
    }

    const handleSubmitShot = (e, name) => {
        e.preventDefault();

        const data = {
            drink: name,
        }

        setTimeout(() => {
            onSubmit(data);
            setBottle([])
        }, 5000);
    }

    const animateIndividual = {
        active: {
            rotate: -120,
            y: "-5vw",
        },
        Campari: {
            x: "-25vw", 
            y: "10vh",
            scale: 1
        },
        Cointreau: {
            x: "-15vw",
            y: "10vh", 
            scale: 1,
        },
        Gin: {
            x: "-5vw", 
            y: "10vh",
            scale: 1,
        }, 
        Rum: {
            x: "5vw",
            y: "10vh", 
            scale: 1,
        }, 
        Tequila: {
            x: "15vw",
            y: "10vh", 
            scale: 1,
        },
        Vodka: {
            x: "25vw", 
            y: "10vh",
            scale: 1,
        },
        Cola: {
            x: "-25vw", 
            y: "10vh",
            scale: 1,
        },
        Ginger: {
            x: "-15vw", 
            y: "10vh", 
            scale: 1,
        }, 
        Spite: {
            x: 0,
            y: "10vh", 
            scale: 1,
        }, 
        Tonic: {
            x: "15vw",
            y: "10vh", 
            scale: 1,
        }, 
        Water: {
            x: "25vw", 
            y: "10vh",
            scale: 1,
        }
    }

    if (bottle.length === 0) {
        return (
            <>
            <div className={styles.back}>
                <button onClick={(e) => handleClick(e.currentTarget.name)} name="back" className={styles.backButton}>Back to Bar</button>
            </div>

            <AnimatePresence>
                <motion.div className={styles.overview} 
                    initial={{ x: "-75vw" }}
                    animate={{ x: 0 }}
                    transition={{ type: "tween", duration: 3, ease: "easeOut", staggerChildren: 2}}
                    >
                
                {drinks.map((drink) => (
                    <div key={drink.sys.id} className={styles.drinkImage}>
                        <button onClick={(e) => handleClickBottle(e)}className={styles.button} name={drink.fields.name}>
                        <Image 
                            src={"https:" + drink.fields.image.fields.file.url} 
                            width={drink.fields.image.fields.file.details.image.width / 2.5 } 
                            height={drink.fields.image.fields.file.details.image.height / 2.5 }/>           
                        </button>      
                    </div>
                ))}
                </motion.div>
            </AnimatePresence>     
        </>
        )
    }

    if (bottle.length > 0) {
        const bottleObj = bottle[0];
        return (
            <>
            <motion.div className={styles.content}
                initial={{ x: "-5vw", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5, delay: 3 }}>
                <p className={styles.description}>Click the bottle to fill up the shot</p>
            </motion.div>
            <div className={styles.overview}>

                <motion.div className={styles.overlay}
                    variants={animateIndividual}
                    initial={{ opacity: 0 }}
                    >
                    </motion.div> 
                <motion.div className={styles.shot}>
                    <div>
                        <Image
                                src="/../public/assets/shot.png"
                                width="132"
                                height="219"
                        />    
                    </div> 
                </motion.div>
                <AnimatePresence>
                    <motion.div className={styles.bottleImage}
                        onTapStart={(e) => handleSubmitShot(e, bottleObj.fields.name)}
                        variants={animateIndividual}
                        initial={bottleObj.fields.name}
                        animate={{ x: 0, y: "15vh", scale: 1.5 }}
                        transition={{ duration: 2, type:"tween", ease: "easeOut" }}

                        whileTap="active"
                        >
                        <Image 
                            src={"https:" + bottleObj.fields.image.fields.file.url} 
                            width={bottleObj.fields.image.fields.file.details.image.width / 2} 
                            height={bottleObj.fields.image.fields.file.details.image.height / 2}/>           
                    </motion.div>
                </AnimatePresence>
            </div>
            </>
        )
    }

    return (
        <p>Beverages</p>
    ) 
}