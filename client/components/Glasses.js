import styles from "./Glasses.module.css";
import Image from "next/image";

export default function Glasses({ glasses, onSubmit }) {

    const addGlass = (e) => {
        e.preventDefault();
        const data = {
            glass: e.target.value,
        }
        const page = "second";
        const input = [data, page];

        onSubmit(input);
    }
    
    return (
        <form className={styles.content}>
        
        <div className={styles.glassOverview}> 
            {glasses.map((glass) => (
                <div key={glass.id}  className={styles.glassButton}>

                    <div className={styles.glassImage}>
                        <Image 
                            src={process.env.STRAPI_URL + glass.image.url} 
                            width={glass.image.width /1.5} 
                            height={glass.image.height /1.5}/>           
                    </div>   

                    <input onChange={(e) => addGlass(e)} 
                            type="radio" 
                            id={glass.id} 
                            name="glass" 
                            value={glass.name} 
                            className={styles.radioButton}/>
                    <label htmlFor={glass.name} 
                            className={styles.label}>
                        {glass.name}</label>
                </div>            
            ))}     
        </div>    
        </form>
    )
}