import styles from "../styles/Setup.module.css";
import Image from "next/image";

export default function Setup() {
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
            <Image src="/assets/ice-bucket.webp"
                    alt="Ice bucket with liquor"
                    width={203}
                    height={252}
            />
        </div>

        <div className={styles.fridge}>
            <Image src="/assets/fridge.webp"
                    alt="Fridge with soda"
                    width={247}
                    height={340}
            />
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