import styles from "../../styles/Bar.module.css";
import Display from "../../components/Display";
import Choice from "../../components/Choice";
import Navigation from "../../components/Navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Bar({ data }) {
    const [buttonClicked, setButtonClicked] = useState({name: ""});

    const handleClickButton = button => {
        // console.log(button);
        const currentClick = button; 
        const copy = {...buttonClicked};
        copy.name = currentClick;
        setButtonClicked(copy);
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
                <Link href="/">
                    <a className={styles.next}>Next</a>
                </Link>
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

            <Choice drinks={data.filter((drink) => drink.alcohol === true)}/>
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

            <Choice drinks={data.filter((drink) => drink.alcohol === false)}/>
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

export async function getStaticProps () {
    const response = await fetch(`${process.env.STRAPI_URL}/drinks`);
    const data = await response.json();
  
    return {
      props: {
        data,
      },
    };
  };