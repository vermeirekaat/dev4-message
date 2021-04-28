import styles from "./Ingredients.module.css";
import { useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";


export default function Ingredients({ ingredients, cocktailGlass, onSubmit }) {
    const glass = cocktailGlass[0];
    console.log(cocktailGlass);

    const transformProps = {
        hidden: {
            opacity: 0,
            y: "25vh"
        },
        visible: {
            opacity: 1,
            y: 0,
        }
    }

    const [checkedItem, setCheckedItem] = useState("");
    const constraintRef = useRef(null);

    const addItem = (e) => {
        e.preventDefault();

        const data = {
            ingredient: checkedItem,
        }
        onSubmit(data);
    }

    const dragItem = (e, name) => {
        if (e.x <= 500) {
            const copy = [...checkedItem]
            copy.push(name);
            setCheckedItem(copy);
        }
        if (e.x >= 500) {
            const copy = [...checkedItem];

            const deleteItem = copy.findIndex((check) => check === name);
            checkedItem.splice(deleteItem, 1);
        }
    }
    
    return (
        <>
        <div className={styles.information}>
          <motion.p className={styles.description}
              initial={{ y: "-5vw", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 3 }}>
            Drag the ingredients to add them to your cocktail</motion.p>
        </div>

        <motion.div className={styles.container}
            ref={constraintRef}>

            <motion.div className={styles.glass}
             variants={transformProps}
             initial="hidden"
             animate="visible"
             transition={{ type: "tween", duration: 3, ease: "easeOut"}}>
                <Image 
                    src={"https:" + glass.fields.image.fields.file.url} 
                    width={glass.fields.image.fields.file.details.image.width} 
                    height={glass.fields.image.fields.file.details.image.height}/>           
            </motion.div>

            <form onSubmit={(e) => addItem(e)} className={styles.content}>
             <motion.input type="submit"  className={styles.button}      value="Complete Cocktail"
                initial={{ y: "-5vw", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition= {{duration: 2, delay: 4}}/>        
            <motion.div className={styles.extraOverview}
                initial={{ x: "50vw" }}
                animate={{ x: 0 }}
                transition={{ type: "tween", duration: 3, ease: "easeIn", staggerChildren: .5}}
                >
            {ingredients.map((extra) => (
                <motion.div key={extra.sys.id}  className={styles.extraButton}
                drag 
                dragConstraints={constraintRef}
                onDragEnd={(e) => dragItem(e, extra.fields.name)}
                >
                <input type="checkbox" name="extra" 
                        value={extra.fields.name} 
                        className={styles.checkbox}
                        />

                    <div className={styles.extraImage}>
                    
                        <Image 
                            src={"https:" + extra.fields.image.fields.file.url} 
                            width={extra.fields.image.fields.file.details.image.width / 4} 
                            height={extra.fields.image.fields.file.details.image.height / 4}/>          
                    </div> 
                </motion.div>            
            ))}     
            </motion.div>  
        </form>
    </motion.div>
    </>
    )
}