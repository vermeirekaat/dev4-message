import styles from "./Display.module.css";
import Image from "next/image";

export default function Display({ handleClick }) {

    return (
        <>
        <div className={styles.display}>
            <div className={styles.liquor}>
                <button onClick={(e) => handleClick(e.currentTarget.name)} name="liquor" className={styles.button}>
                    <Image src="/assets/ice-liquor.webp"
                        alt="Ice bucket with liquor"
                        width={406}
                        height={466}
                    />
                </button>
            </div>

            <div className={styles.soda}>
                <button onClick={(e) => handleClick(e.currentTarget.name)} name="soda" className={styles.button}>
                    <Image src="/assets/ice-sodas.png"
                        alt="Ice bucket with soda"
                        width={406}
                        height={466}
                    />
                </button>
            </div>
        </div>   
        </>  
    )
}