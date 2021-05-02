import Welcome from "../components/Welcome";
import Layout from "../components/Layout";
import Glasses from "../components/Glasses";
import Display from "../components/Display";
import Drinks from "../components/Drinks";
import Ingredients from "../components/Ingredients";
import Message from "../components/Message";
import styles from "./Home.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";

import { createClient as deliveryClient } from "contentful";

export default function Home({ result }) {
  const router = useRouter();

  const glassesAr = result.items.filter((item) => item.fields.name === "Glasses");
  const drinksAr = result.items.filter((item) => item.fields.name === "Drinks"); 
  const ingredientsAr = result.items.filter((item) => item.fields.name === "Ingredients");

  const glasses = glassesAr[0].fields.objects;
  const drinks = drinksAr[0].fields.objects;
  const ingredients = ingredientsAr[0].fields.objects;

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

  const [currentStep, setCurrentStep] = useState("");
  const [buttonDrinks, setButtonDrinks] = useState("back");
  const [cocktailItem, setCocktailItem] = useState({
    glass: "", 
    beverages: [], 
    ingredients: [],
  });

  const handleSubmitCocktail = async (cocktail) => {
    const response = await fetch("/api/post", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(cocktail),
    })
    await response.json();
  }

  const handleSubmitGlasses = async data => {
    const copy = {...cocktailItem};
    copy.glassName = data.glass;

    const check = glasses.filter((item) => item.fields.name === data.glass);

    copy.glass = check[0].sys.id

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

    setCocktailItem(copy)
    setCurrentStep("fourth");
  };

  const handleSubmitMessage = async data => {
    const cocktailFinal = {
      glassName: cocktailItem.glassName, 
      glass: cocktailItem.glass,
      beverages: cocktailItem.beverages, 
      ingredients: cocktailItem.ingredients,
      message: data.message,
      sender: data.sender, 
      receiver: data.receiver,
      nano: nanoid(),
    }

    const res = handleSubmitCocktail(cocktailFinal);
    await res; 
    router.push({
      pathname: "/success",
      query: cocktailFinal,
    })
  };

  if (currentStep === "first") {
    return (
      <Layout overview={cocktailItem}>

        <Glasses glasses={glasses} onSubmit={handleSubmitGlasses}/>
      </Layout>
    )
  }

  if (currentStep === "second" && buttonDrinks === "back") {
    return (
    <Layout overview={cocktailItem}>     

      <Display handleClickChoice={(button) => setButtonDrinks(button)}    handleClickExtra={(button) => setCurrentStep(button)}/>
    </Layout>
    )
  }

  if (currentStep === "second" && buttonDrinks === "liquor") {
    return (
      <Layout overview={cocktailItem}>

        <Drinks drinks={drinks.filter((drink) => drink.fields.alcohol === true)} 
                onSubmit={handleSubmitDrinks} 
                handleClick={(button) => setButtonDrinks(button)}/>
      </Layout>
    )
  }

  if (currentStep === "second" && buttonDrinks === "soda") {
    return (
      <Layout overview={cocktailItem}>
  
        <Drinks drinks={drinks.filter((drink) => drink.fields.alcohol === false)} 
                onSubmit={handleSubmitDrinks} 
                handleClick={(button) => setButtonDrinks(button)}/>
      </Layout>
    )
  }

  if (currentStep === "third") {
    return (

      <Layout overview={cocktailItem}>
      
        <Ingredients ingredients={ingredients} cocktailGlass={glasses.filter((item) => item.fields.name === cocktailItem.glassName)} onSubmit={handleSubmitIngredients}/>
      </Layout>
    )
  }

  if (currentStep === "fourth") {
    return (
      <Layout overview={cocktailItem}>

        <Message onSubmit={handleSubmitMessage}/>

      </Layout>
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
          Welcome to our virtual Cocktail Bar where you can mix and match your favourite drinks and toast to a better future!
        </motion.p>
          
        <motion.button 
          variants={dissolveVariants}
          initial="hidden"
          animate="visible"
          transition= {{duration: 2, delay: 6}}
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
