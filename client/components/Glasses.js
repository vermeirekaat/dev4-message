import styles from "../styles/Counter.module.css";
import Image from "next/image";

export default function Glasses({ glasses }) {
    // console.log(glasses);

    const handleClickGlass = (e) => {
        console.log(e.currentTarget.name);
    }

    return (
        <div className={styles.counter}>
            {glasses.map((glass) => (
                <div className={styles.glassRegular}>
                    <button onClick={(e) => handleClickGlass(e)}className={styles.placeholder} name={glass.name}>{glass.name}</button>
            </div>
            ))}
                {/* <div className={styles.glassRegular}>
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
              
            </div> */}
                   
            </div>
    )
}