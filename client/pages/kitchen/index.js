import Navigation from "../../components/Navigation";
import Extras from "../../components/Extras";
import styles from "./Kitchen.module.css";
import Image from "next/image";

export default function Counter({ extras }) {

    return (
        <div className={styles.container}>
          <Navigation/>
            <h1 className={styles.hidden}>Counter</h1>

            <div className={styles.context}>
            <Image src="/assets/letters-glow.png"
                alt="Cocktail O' Clock"
                width={654}
                height={168}
                />
                <p className={styles.question}>Choose a glass</p>
            </div>
            

            <Extras extras={extras}/>
         </div>
    )
}

export async function getStaticProps () {
    const response = await fetch(`${process.env.STRAPI_URL}/extras`);
    const extras = await response.json();
  
    return {
      props: {
        extras,
      },
    };
  };