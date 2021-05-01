import styles from "./Animation.module.css";
import Image from "next/image";

export default function Animation ({ cocktail }) {

    const ingredientsAr = cocktail.fields.ingredients.split(",");
    const drinksAr = cocktail.fields.beverages.split(",");
    

    return (
        <div className={styles.container}>
            <div className={styles.ingredients}>
                {ingredientsAr.map((ingredient) => (
                    <div key={ingredient.index}  className={styles.ingredientImage}>
                            <Image 
                                src={`/assets/${ingredient}.webp`} 
                                width={200} 
                                height={200}/>           
                    </div>
                ))}
            </div>

            <div className={styles.drinks}>
                {drinksAr.map((drink) => (
                    <div key={drink.index}  className={styles.drinkImage}>
                            <Image 
                                src={`/assets/${drink}.webp`} 
                                width={100} 
                                height={400}/>           
                    </div>
                ))}
            </div>

            <div className={styles.glassImage}>
                            <Image 
                                src={"https:" + cocktail.fields.glass.fields.image.fields.file.url} 
                                width={cocktail.fields.glass.fields.image.fields.file.details.image.width / 1.5} 
                                height={cocktail.fields.glass.fields.image.fields.file.details.image.height / 1.5}/>           
                </div>

        </div>
    )
}