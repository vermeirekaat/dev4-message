import styles from "./Extras.module.css";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";


export default function Extras({ extras, onSubmit }) {

    const [checkedItem, setCheckedItem] = useState("");
    // const router = useRouter();

    const addItem = (e) => {
        e.preventDefault();

        console.log()

        const data = {
            extra: checkedItem,
        }

        e.target.reset();
        // onSubmit(data);

        console.log(data);

        // router.push("/bar");
    }

    const checkItem = (e) => {
        console.log(e.target.value);

        const copy = [...checkedItem]
        copy.push(e.target.value);
        setCheckedItem(copy);
        console.log(checkedItem);
    }
    
    return (
        <form onSubmit={(e) => addItem(e)} className={styles.counter}>
        <input type="submit"  className={styles.button} value={checkedItem}/> 
        <div className={styles.glassOverview}> 
            {extras.map((extra) => (
                <div key={extra.id}  className={styles.glassButton}>
                    <input onChange={(e) => checkItem(e)} type="checkbox" id={extra.id} name="extra" value={extra.name} className={styles.radioButton}/>
                    <div className={styles.glassImage}>
                    <label htmlFor={extra.name} className={styles.label}>{extra.name}</label>
                    
                        <Image 
                            src={process.env.STRAPI_URL + extra.image.url} 
                            width={extra.image.width /1.5} 
                            height={extra.image.height /1.5}/>
                            
                    </div>     
                </div>            
            ))}     
        </div>  
            
        </form>
    )
}