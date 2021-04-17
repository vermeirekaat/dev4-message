import styles from "./Bar.module.css";
import Display from "../../components/Display";
import Choice from "../../components/Choice";
import Navigation from "../../components/Navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Bar({ drinks, cocktails }) {

    
    const getId= () => {
        const cocktailIds = [];
        cocktails.map((cocktail) => { 
            cocktailIds.push(Number(cocktail.id));
        })
        const max = cocktailIds.reduce(function(a,b) {
            return Math.max(a,b);
        })
        return max;
    }
    

    const [buttonClicked, setButtonClicked] = useState({name: ""});

    const handleClickButton = button => {
        // console.log(button);
        const currentClick = button; 
        const copy = {...buttonClicked};
        copy.name = currentClick;
        setButtonClicked(copy);
    }

    const handleSubmit = async data => {
        const id = getId();
        data.cocktail = id;
        const checkDrink = drinks.filter((drink) => drink.name === data.name); 
        data.drink = checkDrink[0].id; 

        await fetch(`${process.env.STRAPI_URL}/ingredients/`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
    }

    if(buttonClicked.name === "") {
        return (
            <>
            <Navigation/>
            <div className={styles.container}>
            <h1 className={styles.hidden}>Drinks</h1>

            <div className={styles.context}>
            <Image src="/assets/letters-glow.png"
                alt="Cocktail O' Clock"
                width={654}
                height={168}
                />
                <p className={styles.question}>Add some liquid</p>
            </div>

            <Display handleClick={(button) => handleClickButton(button)}/>

        </div>
        </>
        )
    }
    
    if (buttonClicked.name === "liquor") {
        return (
            <>
            <Navigation/>
            <div className={styles.container}>
            <h1 className={styles.hidden}>Drinks</h1>

            <div className={styles.context}>
            <Image src="/assets/letters-glow.png"
                alt="Cocktail O' Clock"
                width={654}
                height={168}
                />
                <p className={styles.question}>Add some liquor</p>
            </div>

            <Choice drinks={drinks.filter((drink) => drink.alcohol === true)} onSubmit={handleSubmit}/>
        </div>
        </>
        )
    }

    if (buttonClicked.name === "soda") {
        return (
            <>
            <Navigation/>
            <div className={styles.container}>
            <h1 className={styles.hidden}>Drinks</h1>

            <div className={styles.context}>
            <Image src="/assets/letters-glow.png"
                alt="Cocktail O' Clock"
                width={654}
                height={168}
                />
                <p className={styles.question}>Add some soda</p>
            </div>

            <Choice drinks={drinks.filter((drink) => drink.alcohol === false)} onSubmit={handleSubmit}/>
        </div>
        </>
        )
    }
 
    return (
        <div className={styles.container}>
            <h1 className={styles.hidden}>Drinks</h1>

            <div className={styles.context}>
            <Image src="/assets/letters-glow.png"
                alt="Cocktail O' Clock"
                width={654}
                height={168}
                />
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const [drinksRes, cocktailsRes] = await Promise.all([
      fetch(`${process.env.STRAPI_URL}/drinks`),
      fetch(`${process.env.STRAPI_URL}/cocktails`),
    ]);
    const [drinks, cocktails] = await Promise.all([drinksRes.json(), cocktailsRes.json()]);
    return { props: {drinks, cocktails} };
  }