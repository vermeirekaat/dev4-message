import Welcome from "../components/Welcome";
import Navigation from "../components/Navigation";
import Glasses from "../components/Glasses";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home({ glasses }) {

  const [currentStep, setCurrentStep] = useState("");

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

  if (currentStep === "first") {
    return (
      <Navigation>
        <div className={styles.content}>
          <p className={styles.description}>Choose a glass</p>
        </div>

        <Glasses glasses={glasses} onSubmit={handleSubmit}/>
      </Navigation>
    )
  }


  return (
    <Welcome>
      <div className={styles.content}>
        <p className={styles.description}>
          Welcome to our online Cocktail Bar where you can mix and match your favourite drinks and toost to a better future!
        </p>
          
        <button onClick={(e) => setCurrentStep(e.target.name)} name="first" className={styles.button}>Let's start shaking</button>
      </div>
    </Welcome>      
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
