import styles from "./Choice.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Drinks ({ drinks, onSubmit }) {

    const [bottle, setBottle] = useState([]);

    const handleClickBottle = (e) => {
        const choice = e.currentTarget.name;

        const newChoice = drinks.filter((item) => item.name === choice);
        setBottle(newChoice);
    }

    const handleSubmitQuantity = (e) => {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            quantity: e.target.quantity.value,
        }

        onSubmit(data);
        setBottle([]);
    }

    if (bottle.length === 0) {
        return (
            <>
            <div className={styles.back}>
            <Link href="/bar">
                <a className={styles.buttonBack}>Back to bar</a>
            </Link>
            </div>
             
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
        </>
        )
    }

    if (bottle.length > 0) {
        const bottleObj = bottle[0];
        return (
            <div className={styles.overview}>
                <form onSubmit={(e) => handleSubmitQuantity(e)} className={styles.form}>
                    <input type="hidden" name="name" value={bottleObj.name}/>
                    <input type="number" name="quantity" defaultValue={bottleObj.quantity} min="0"/>
                    <input className={styles.submitButton} type="submit" value="Add Shots"/>
                </form>
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