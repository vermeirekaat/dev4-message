import styles from "./Animation.module.css";
import Image from "next/image";

export default function Animation ({ cocktail, drinks, ingredients }) {

    return (
        <div className={styles.container}>
            <div className={styles.ingredients}>
                {ingredients.map((ingredient) => (
                    <div key={ingredient.sys.id}  className={styles.ingredientImage}>
                            <Image 
                                src={"https:" + ingredient.fields.image.fields.file.url} 
                                width={ingredient.fields.image.fields.file.details.image.width / 5} 
                                height={ingredient.fields.image.fields.file.details.image.height / 5}/>           
                    </div>
                ))}
            </div>

            <div className={styles.drinks}>
                {drinks.map((drink) => (
                    <div key={drink.sys.id}  className={styles.drinkImage}>
                            <Image 
                                src={"https:" + drink.fields.image.fields.file.url} 
                                width={drink.fields.image.fields.file.details.image.width / 5} 
                                height={drink.fields.image.fields.file.details.image.height / 5}/>           
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