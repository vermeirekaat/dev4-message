import { useState } from "react";
import styles from "../styles/Setup.module.css";
import Image from "next/image";
import Liquor from "../components/Liquor";

export default function Setup({ drinks }) {
    const [buttonClicked, setButtonClicked] = useState({name: ""});

    const handleClickButton = e => {
        console.log(e.currentTarget.name);
        const currentClick = e.currentTarget.name; 
        const copy = {...buttonClicked};
        copy.name = currentClick;
        setButtonClicked(copy);
    }

    if (buttonClicked.name === "liquor") {
        return <Liquor liquors={drinks}/>
    }
    if (buttonClicked.name === "soda") {
        return <Soda sodas={drinks}/>
    }

    return (
        <div className={styles.container}>
             <div className={styles.regular}>
            <Image src="/assets/shelf-regular.webp"
                    alt="Shelf with regular glasses"
                    width={215}
                    height={59}
            />
        </div>
        <div className={styles.margharita}>
            <Image src="/assets/shelf-margharita.webp"
                    alt="Shelf with margharita glasses"
                    width={215}
                    height={72}
            />
        </div>
        <div className={styles.cosmo}>
            <Image src="/assets/shelf-cosmo.webp"
                    alt="Shelf with cosmo glasses"
                    width={215}
                    height={78}
            />
        </div>
        
        <div className={styles.bucket}>
            <button onClick={(e) => handleClickButton(e)} name="liquor" className={styles.button}>
                <Image src="/assets/ice-bucket.webp"
                    alt="Ice bucket with liquor"
                    width={203}
                    height={252}
                />
            </button>
           
        </div>

        <div className={styles.fridge}>
            <button onClick={(e) => handleClickButton(e)} name="soda" className={styles.button}>
            <Image src="/assets/fridge.webp"
                    alt="Fridge with soda"
                    width={247}
                    height={340}
            />
            </button>
        </div>

        <div className={styles.bar}>
            <Image src="/assets/bar.webp"
                    alt="Bar Counter"
                    width={1920}
                    height={474}
            />
        </div>
        <div className={styles.logo}>
            <Image src="/assets/letters-glow.png"
                    alt="Cocktail O' Clock"
                    width={218}
                    height={56}
            />
        </div>
    </div>
    )
}