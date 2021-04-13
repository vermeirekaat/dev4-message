import styles from "../../styles/Counter.module.css";
import Image from "next/image";

export default function Counter() {
    return (
        <div className={styles.container}>
            <h1 className={styles.hidden}>Counter</h1>

            <div className={styles.context}>
            <Image src="/assets/letters-glow.png"
                alt="Cocktail O' Clock"
                width={654}
                height={168}
                />
                <p className={styles.question}>Choose a glass</p>
            </div>

            <div className={styles.counter}>
                <div className={styles.glassRegular}>
                    <button className={styles.button} name="regular">
                        <Image src="/assets/regular.webp"
                                alt="Regular Glass"
                                width={214}
                                height={261}
                        />
                    </button>
                </div>
               
               <div className={styles.glassMargha}>
                   <button className={styles.button} name="margha">
                        <Image src="/assets/margharita.webp"
                                alt="Margharita Glass"
                                width={299}
                                height={445}
                        />
                   </button>
               
               </div>

               <div className={styles.glassCosmo}>
                <button className={styles.button} name="cosmo">
                    <Image src="/assets/cosmo.webp"
                            alt="Cosmopolitan Glass"
                            width={305}
                            height={471}
                />
                </button>
              
               </div>
                
               
            </div>
        </div>
    )
}