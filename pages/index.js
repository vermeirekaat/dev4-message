import Welcome from "../components/Welcome";
import Navigation from "../components/Navigation";
import Glasses from "../components/Glasses";
import Display from "../components/Display";
import Drinks from "../components/Drinks";
import Extras from "../components/Ingredients";
import styles from "./Home.module.css";
import { useState } from "react";
import { motion } from "framer-motion";

import { createClient as deliveryClient } from "contentful";

export default function Home({ result }) {

  const glassesAr = result.items.filter((item) => item.fields.name === "Glasses");
  const drinksAr = result.items.filter((item) => item.fields.name === "Drinks"); 
  const ingredientsAr = result.items.filter((item) => item.fields.name === "Ingredients");

  const glasses = glassesAr[0].fields.objects;
  const drinks = drinksAr[0].fields.objects;
  const ingredients = ingredientsAr[0].fields.objects;

  // MOTION
  const dissolveVariants = {
    hidden: {
      opacity: 0,
      y: -100
    },
    visible: {
      opacity: 1,
      y: 0
    },
  } 

  // USESTATES
  const [currentStep, setCurrentStep] = useState("first");
  const [buttonDrinks, setButtonDrinks] = useState("back");
  const [cocktailItem, setCocktailItem] = useState({
    glass: "", 
    beverages: [], 
    ingredients: [],
  });

  /* const handleSubmitCocktail = async () => {
    const response = await fetch("/api/postGlass", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({ data }),
    })
  } */ 


  const handleSubmitGlasses = async data => {

    const copy = {...cocktailItem};
    copy.glass = data.glass;
    setCocktailItem(copy);

    setCurrentStep("second");
    };

  const handleSubmitDrinks = async data => {
    const copy = {...cocktailItem};
    const copyDrinks = [...copy.beverages];
    copyDrinks.push(data.drink);
    copy.beverages = copyDrinks;

    setCocktailItem(copy);
    setCurrentStep("second"); 
  }

  const handleSubmitIngredients = async data => {
    const copy = {...cocktailItem};
    copy.ingredients = data.ingredient;

    setCocktailItem(copy);
  };

  console.log(cocktailItem);

  if (currentStep === "first") {
    return (
      <Navigation overview={cocktailItem}>
        <motion.div className={styles.content}
          initial={{ y: "-5vw", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 3 }}>
          <p className={styles.description}>Choose a glass</p>
        </motion.div>

        <Glasses glasses={glasses} onSubmit={handleSubmitGlasses}/>
      </Navigation>
    )
  }

  if (currentStep === "second" && buttonDrinks === "back") {
    return (
    <Navigation overview={cocktailItem}>
      <motion.div className={styles.content}
          initial={{ y: "-5vw", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 3 }}>
          <p className={styles.description}>Add some beverages</p>
      </motion.div>

      <div className={styles.buttonDisplay}>
        <button onClick={(e) => setCurrentStep(e.target.name)} name="third" className={styles.nextButton}>Add Extra's</button>
      </div>
     

      <Display handleClick={(button) => setButtonDrinks(button)}/>
    </Navigation>
    )
  }

  if (currentStep === "second" && buttonDrinks === "liquor") {
    return (
      <Navigation overview={cocktailItem}>
        <motion.div className={styles.content}
          initial={{ y: "-5vw", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 3 }}>
          <p className={styles.description}>Add some liquor</p>
        </motion.div>
  
        <Drinks drinks={drinks.filter((drink) => drink.fields.alcohol === true)} 
                onSubmit={handleSubmitDrinks} 
                handleClick={(button) => setButtonDrinks(button)}/>
      </Navigation>
    )
  }

  if (currentStep === "second" && buttonDrinks === "soda") {
    return (
      <Navigation overview={cocktailItem}>
        <div className={styles.content}>
          <p className={styles.description}>Add some soda</p>
        </div>
  
        <Drinks drinks={drinks.filter((drink) => drink.fields.alcohol === false)} 
                onSubmit={handleSubmitDrinks} 
                handleClick={(button) => setButtonDrinks(button)}/>
      </Navigation>
    )
  }

  if (currentStep === "third") {
    return (
      <Navigation overview={cocktailItem}>
        <div className={styles.content}>
          <p className={styles.description}>Give your cocktail some finishing touches</p>
        </div>
      
        <Extras ingredients={ingredients} cocktailGlass={glasses.filter((item) => item.fields.name === cocktailItem.glass)} onSubmit={handleSubmitIngredients}/>
      </Navigation>
    )
  }

  return (
    <Welcome>
      <div className={styles.content}>
        <motion.p className={styles.description}
          variants={dissolveVariants}
          initial="hidden"
          animate="visible"
          transition= {{duration: 5, delay: 3}}>
          Welcome to our online Cocktail Bar where you can mix and match your favourite drinks and toost to a better future!
        </motion.p>
          
        <motion.button 
          variants={dissolveVariants}
          initial="hidden"
          animate="visible"
          transition= {{duration: 3, delay: 5}}
          onClick={(e) => setCurrentStep(e.target.name)} 
          name="first" 
          className={styles.nextButton}>
        Let's start shaking</motion.button>
      </div>
    </Welcome>      
  )
}

export async function getStaticProps() {

  const client = deliveryClient({
      space: process.env.CONTENTFUL_SPACE,
      accessToken: process.env.CONTENTFUL_TOKEN,
  });

  const result = await client.getEntries({ content_type: "data" }); 

  return {
    props: {
      result
    }
  }
}
