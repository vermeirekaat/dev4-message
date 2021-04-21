import Welcome from "../components/Welcome";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {

  // const [currentStep, setCurrentStep] = useState("home");


  return (
    <Welcome>
      <div className={styles.content}>
        <p className={styles.description}>
          Welcome to our online Cocktail Bar where you can mix and match your favourite drinks and toost to a better future!
        </p>
          
        <button className={styles.button}>Let's start shaking</button>
      </div>
    </Welcome>      
  )
}
