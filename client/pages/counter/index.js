import Navigation from "../../components/Navigation";
import Glasses from "../../components/Glasses";
import styles from "./Counter.module.css";
import Image from "next/image";

export default function Counter({ glasses }) {

  const handleSubmit = async (data) => {

    const check = glasses.filter((glass) => glass.name === data.glass); 
    data.glass = check[0].id; 

    await fetch(`${process.env.STRAPI_URL}/cocktails/`,
    {
      method: "POST",
      body: JSON.stringify(data), 
      headers: {
        "Content-type": "application/json; charset=UTF-8", 
      },
    });
  };

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

            <Glasses glasses={glasses} onSubmit={handleSubmit}/>
         </div>
    )
}

export async function getStaticProps () {
    const response = await fetch(`${process.env.STRAPI_URL}/glasses`);
    const glasses = await response.json();
  
    return {
      props: {
        glasses,
      },
    };
  };