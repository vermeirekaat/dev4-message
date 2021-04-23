import Welcome from "../components/Welcome";
import Navigation from "../components/Navigation";
import Glasses from "../components/Glasses";
import Display from "../components/Display";
import Drinks from "../components/Drinks";
import Extras from "../components/Extras";
import styles from "./Home.module.css";
import { useState } from "react";
import { motion } from "framer-motion";

import { createClient } from "contentful";

export default function Home({ result }) {

  const glassesAr = result.items.filter((item) => item.fields.name === "Glasses");
  const drinksAr = result.items.filter((item) => item.fields.name === "Drinks"); 

  const glasses = glassesAr[0].fields.objects;
  const drinks = drinksAr[0].fields.objects;

  const getClient = () => {
     const client = createClient({
      space: process.env.CONTENTFUL_SPACE,
      accessToken: process.env.CONTENTFUL_TOKEN,
    });

    return client;
  }


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

  const getId = () => {
    const cocktailIds = [];
    cocktails.map((cocktail) => { 
        cocktailIds.push(Number(cocktail.id));
    })
    const max = cocktailIds.reduce(function(a,b) {
        return Math.max(a,b);
    })
    return max;
  } 

  /* const getExtraId = data => {
    const idArray = [];
    data.extra.map((item) => {
        console.log(item);
        const checkExtra = extras.filter((extra) => extra.name === item)
        console.log(checkExtra);
        // data.extra = checkExtra[0].id;
        idArray.push(checkExtra[0].id);
    })
    return idArray;
} */ 

  const handleSubmitGlasses = async input => {
    const data = input[0];
    const page = input[1];

    const check = glasses.filter((glass) => glass.fields.name === data.glass); 
    data.glass = check[0].sys.id; 

    const client = getClient();

    await client.getEntries({ content_type: ["cocktails"] }), {
      method: "POST",
      body: JSON.stringify(data), 
      headers: {
        "Content-type": "application/json; charset=UTF-8", 
      },
    };

    setCurrentStep(page);
  };

  const handleSubmitDrinks = async data => {

    const id = getId();
    data.cocktail = id;
    const checkDrink = drinks.filter((drink) => drink.fields.name === data.drink); 
    data.drink = checkDrink[0].sys.id;

    await fetch(`${process.env.STRAPI_URL}/beverages/`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
}

  /* const handleSubmitExtra = async data => {
    const id = getId();
    data.cocktail = id;

    const extraId = getExtraId(data);

    data.extras = extraId;
    
    await fetch(`${process.env.STRAPI_URL}/ingredients/`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } */

  if (currentStep === "first") {
    return (
      <Navigation>
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
    <Navigation>
      <motion.div className={styles.content}
          initial={{ y: "-5vw", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 3 }}>
          <p className={styles.description}>Add some beverages</p>
      </motion.div>

      {<button onClick={(e) => setCurrentStep(e.target.name)} name="third" className={styles.nextButton}>Add Extra's</button>}

      <Display handleClick={(button) => setButtonDrinks(button)}/>
    </Navigation>
    )
  }

  if (currentStep === "second" && buttonDrinks === "liquor") {
    return (
      <Navigation>
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
      <Navigation>
        <div className={styles.content}>
          <p className={styles.description}>Add some soda</p>
        </div>
  
        <Drinks drinks={drinks.filter((drink) => drink.fields.alcohol === false)} 
                onSubmit={handleSubmitDrinks} 
                handleClick={(button) => setButtonDrinks(button)}/>
      </Navigation>
    )
  }

  /* if (currentStep === "third") {
    return (
      <Navigation>
        <div className={styles.content}>
          <p className={styles.description}>Give your cocktail some finishing touches</p>
        </div>
      
        <Extras extras={extras} onSubmit={handleSubmitExtra}/>
      </Navigation>
    )
  } */

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

  const client = createClient({
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
