import styles from "./Glasses.module.css";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";


export default function Glasses({ glasses, onSubmit }) {
    

    const [clicked, setClicked] = useState(false);
    
    const [checkedObject, setCheckedObject] = useState([]);

    const addGlass = (e) => {
        e.preventDefault();

        setClicked(true);
        const choice = glasses.filter((glass) => glass.fields.name === e.target.value);
        setCheckedObject(choice);

        const data = {
            glass: e.target.value,
        }
        const page = "second";
        const input = [data, page];

        setTimeout(() => {
            onSubmit(input)
        }, 3000);
    }

    const individualVariants = {
        Regular: {
            x: "-20vw", 
            scale: 1
        }, 
        Margharita: {
            x: 0,
            y: "5vw",
            scale: 1,
        },
        Cosmopolitan: {
            x: "20vw", 
            scale: 1
        }
    }
    
    return (
        <>
        <AnimatePresence>
            {!clicked &&
            <form className={styles.content}> 
                <motion.div className={styles.glassOverview}
                    initial={{ x: "50vw" }}
                    animate={{ x: 0 }}
                    transition={{ type: "tween", duration: 3, ease: "easeIn", staggerChildren: .5}}
                    > 
                    
                    {glasses.map((glass) => (
                        <div key={glass.sys.id}  className={styles.glassButton}>

                            <motion.div className={styles.glassImage}>
                                <Image 
                                    src={"https:" + glass.fields.image.fields.file.url} 
                                    width={glass.fields.image.fields.file.details.image.width / 1.5} 
                                    height={glass.fields.image.fields.file.details.image.height / 1.5}/>           
                            </motion.div>   

                            <input onChange={(e) => addGlass(e)} 
                                    type="radio" 
                                    name="glass" 
                                    value={glass.fields.name} 
                                    className={styles.radioButton}/>
                        </div>            
                    ))}     
                </motion.div>     
            </form>
        }   
    </AnimatePresence>
    
    <AnimatePresence>
        {clicked && 
            <motion.div className={styles.content}
            variants={individualVariants}
                    animate={{x: "-100vw", y: 0}}
                    transition={{delay: 2, duration: 3}}>
    
                <motion.div 
                    variants={individualVariants}
                    initial={checkedObject[0]}
                    animate={{x: 0, y: 0, scale: 1.2 }}
                    transition={{ duration: 2, type:"tween", ease: "easeOut" }}
                    exit={{x: "-50vw"}}>
                    <Image 
                        src={"https:" + checkedObject[0].fields.image.fields.file.url} 
                        width={checkedObject[0].fields.image.fields.file.details.image.width / 1.5} 
                        height={checkedObject[0].fields.image.fields.file.details.image.height / 1.5}/>          
                </motion.div> 
            </motion.div>   
        }
    </AnimatePresence>
    </>
    )
}