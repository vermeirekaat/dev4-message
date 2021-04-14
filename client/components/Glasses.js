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
                <div key={glass.id} className={styles.glassRegular}>
                    <button onClick={(e) => handleClickGlass(e)}className={styles.placeholder} name={glass.name}>
                        <Image 
                            src={process.env.STRAPI_URL + glass.image.url} 
                            width={glass.image.width} 
                            height={glass.image.height}/>
                    </button>      
            </div>
            ))}                 
        </div>
    )
}