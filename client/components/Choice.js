import styles from "./Choice.module.css";
import Image from "next/image";
import { useState } from "react";

export default function Drinks ({ drinks }) {

    const [bottle, setBottle] = useState([]);


    const handleClickBottle = (e) => {
        // console.log(e.currentTarget.name);
        const choice = e.currentTarget.name;

        const newChoice = drinks.filter((item) => item.name === choice);
        // const copy = {...bottle}; 
        // console.log(copy);
        setBottle(newChoice);
        console.log(bottle);
    }

    if (bottle.length === 0) {
        return (
            <div className={styles.overview}>
                {drinks.map((drink) => (
                    <div key={drink.id} className={styles.drinkImage}>
                        <button onClick={(e) => handleClickBottle(e)}className={styles.button} name={drink.name}>
                        <Image 
                            src={process.env.STRAPI_URL + drink.image.formats.small.url} 
                            width={drink.image.formats.small.width} 
                            height={drink.image.formats.small.height}/>
                        </button>      
                    </div>
                ))}
    
            </div>
        )
    }

    if (bottle.length > 0) {
        console.log(bottle);
        const bottleObj = bottle[0];
        return (
            <div className={styles.overview}>
                    <div className={styles.drinkImage}>
                        <Image 
                            src={process.env.STRAPI_URL + bottleObj.image.formats.small.url} 
                            width={bottleObj.image.formats.small.width} 
                            height={bottleObj.image.formats.small.height}/>  
                    </div>
            </div>
        )
    }

    return (
        <p>Beverages</p>
    )

   
}