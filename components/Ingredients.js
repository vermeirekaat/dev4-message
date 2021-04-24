import styles from "./Ingredients.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";


export default function Ingredients({ ingredients, onSubmit }) {

    const [checkedItem, setCheckedItem] = useState("");

    const addItem = (e) => {
        e.preventDefault();

        const data = {
            ingredient: checkedItem,
        }
        onSubmit(data);
    }

    const checkItem = (e) => {
        if (e.target.checked === true) {
            const copy = [...checkedItem]
            copy.push(e.target.value);
            setCheckedItem(copy);
        }

        if (e.target.checked === false) {
           const copy = [...checkedItem];

            const deleteItem = copy.findIndex((check) => check === e.target.value);
            checkedItem.splice(deleteItem, 1);
        }
    }
    
    return (

        <div className={styles.container}>

            <div className={styles.glass}>


            </div>

            <form onSubmit={(e) => addItem(e)} className={styles.content}>
             <input type="submit"  className={styles.button} value="Complete Cocktail"/>        
            <motion.div className={styles.extraOverview}
                initial={{ x: "50vw" }}
                animate={{ x: 0 }}
                transition={{ type: "tween", duration: 3, ease: "easeIn", staggerChildren: .5}}
                >
            {ingredients.map((extra) => (
                <div key={extra.sys.id}  className={styles.extraButton}>
                <input onChange={(e) => checkItem(e)} 
                        type="checkbox" name="extra" 
                        value={extra.fields.name} 
                        className={styles.checkbox}/>

                    <div className={styles.extraImage}>
                    
                        <Image 
                            src={"https:" + extra.fields.image.fields.file.url} 
                            width={extra.fields.image.fields.file.details.image.width / 4} 
                            height={extra.fields.image.fields.file.details.image.height / 4}/>          
                    </div> 
                </div>            
            ))}     
            </motion.div>  
        </form>
    </div>
    )
}