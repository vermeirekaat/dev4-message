import styles from "../styles/Choice.module.css";
import Image from "next/image";

export default function Choice ({ drinks }) {

    console.log(drinks);


    const handleClickBottle = (e) => {
        console.log(e.currentTarget.name);
    }

    return (
        <div className={styles.overview}>
            <p>Liquor</p>
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