import styles from "./Glasses.module.css";
import { useState } from "react";
import Image from "next/image";

export default function Glasses({ glasses, onSubmit }) {

    const [checkedGlass, setCheckedGlass] = useState(null);
    // moet id van de laatst cocktail zijn

    const addGlass = (e) => {
        e.preventDefault();
        /* const data = {
            ingredient: {
                name: "test", 
                quantity: "2",
              },
              recipient: "test",
              content: "test text",
            glass: checkedGlass,
        } */ 

        const data = {
            glass: checkedGlass,
        }

        e.target.reset();
        onSubmit(data);
    }

    const checkGlass = (e) => {
        console.log(e.target.value);
        setCheckedGlass(e.target.value)
    }
    

    return (
        <form onSubmit={(e) => addGlass(e)} className={styles.counter}>
        <input type="submit"  className={styles.button} value="Next"/> 
        <div className={styles.glassOverview}> 
            {glasses.map((glass) => (
                <div key={glass.id}  className={styles.glassButton}>
                    <input onChange={(e) => checkGlass(e)} type="radio" id={glass.id} name="glass" value={glass.name} className={styles.radioButton}/>
                    <div className={styles.glassImage}>
                    <label htmlFor={glass.name} className={styles.label}>{glass.name}</label>
                    
                        <Image 
                            src={process.env.STRAPI_URL + glass.image.url} 
                            width={glass.image.width /1.5} 
                            height={glass.image.height /1.5}/>
                            
                    </div>     
                </div>            
            ))}     
        </div>  
            
        </form>
    )
}