import styles from "./Drinks.module.css";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Drinks ({ drinks, onSubmit, handleClick }) {

    const [bottle, setBottle] = useState([]);

    const handleClickBottle = (e) => {
        const choice = e.currentTarget.name;

        const newChoice = drinks.filter((item) => item.name === choice);
        setBottle(newChoice);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            quantity: e.target.quantity.value,
        }

        // onSubmit(data);
        //setBottle([]);
    }

    const animateIndividual = {
        Rum: {
            x: "-25vw", 
            y: "10vh",
            scale: 1
        },
        Campari: {
            x: "-15vw",
            y: "10vh", 
            scale: 1,
        },
        Tequila: {
            x: "-5vw", 
            y: "10vh",
            scale: 1,
        }, 
        Cointreau: {
            x: "5vw",
            y: "10vh", 
            scale: 1,
        }, 
        Vodka: {
            x: "15vw",
            y: "10vh", 
            scale: 1,
        },
        Gin: {
            x: "25vw", 
            y: "10vh",
            scale: 1,
        },
        Ginger: {
            x: "-25vw", 
            y: "10vh",
            scale: 1,
        },
        Cola: {
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
                    <div key={drink.id} className={styles.drinkImage}>
                        <button onClick={(e) => handleClickBottle(e)}className={styles.button} name={drink.name}>
                        <Image 
                            src={process.env.STRAPI_URL + drink.image.formats.small.url} 
                            width={drink.image.formats.small.width /1.5 } 
                            height={drink.image.formats.small.height /1.5}/>
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
            <div className={styles.overview}>
                <form 
                    onSubmit={(e) => handleSubmitForm(e)} 
                    className={styles.form}>
                    <input type="hidden" name="name" value={bottleObj.name}/>
                    <input type="number" name="quantity" defaultValue={bottleObj.quantity} min="0"/>
                    <input className={styles.submitButton} type="submit" value="Add Shots"/>
                </form>
                <AnimatePresence>
                    <motion.div className={styles.bottleImage}
                        variants={animateIndividual}
                        initial={bottleObj.name}
                        animate={{ x: 0, y: "15vh", scale: 1.5 }}
                        transition={{ duration: 2, type:"tween", ease: "easeOut" }}
                        >
                        <Image 
                            src={process.env.STRAPI_URL + bottleObj.image.formats.small.url} 
                            width={bottleObj.image.formats.small.width /1.5 } 
                            height={bottleObj.image.formats.small.height / 1.5 }/>  
                    </motion.div>
                </AnimatePresence>
            </div>
        )
    }

    return (
        <p>Beverages</p>
    ) 
}