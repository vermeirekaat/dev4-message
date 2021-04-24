import styles from "./Ingredients.module.css";
import { useState } from "react";
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
        <form onSubmit={(e) => addItem(e)} className={styles.content}>
             <input type="submit"  className={styles.button} value="Complete Cocktail"/>        
        <div className={styles.extraOverview}> 
            {extras.map((extra) => (
                <div key={extra.id}  className={styles.extraButton}>
                <input type="hidden" 
                        name="name" 
                        value={extra.name}/>
                <input onChange={(e) => checkItem(e)} 
                        type="checkbox" id={extra.id} name="extra" 
                        value={extra.name} 
                        className={styles.checkbox}/>

                    <div className={styles.extraImage}>
                    
                        <Image 
                            src={process.env.STRAPI_URL + extra.image.url} 
                            width={extra.image.width /1.5} 
                            height={extra.image.height /1.5}/>          
                    </div> 
                </div>            
            ))}     
        </div>  

    </form>
    )
}