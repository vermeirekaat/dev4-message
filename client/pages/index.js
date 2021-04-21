import Welcome from "../components/Welcome";
import Navigation from "../components/Navigation";
import Glasses from "../components/Glasses";
import Display from "../components/Display";
import Drinks from "../components/Drinks";
import Extras from "../components/Extras";
import styles from "./Home.module.css";
import { useState } from "react";

export default function Home({ glasses, drinks, extras, cocktails }) {

  const [currentStep, setCurrentStep] = useState("");
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

  const getExtraId = data => {
    const idArray = [];
    data.extra.map((item) => {
        console.log(item);
        const checkExtra = extras.filter((extra) => extra.name === item)
        console.log(checkExtra);
        // data.extra = checkExtra[0].id;
        idArray.push(checkExtra[0].id);
    })
    return idArray;
}

  const handleSubmitGlasses = async input => {
    const data = input[0];
    const page = input[1];

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

    setCurrentStep(page);
  };

  const handleSubmitDrinks = async data => {

    const id = getId();
    data.cocktail = id;
    const checkDrink = drinks.filter((drink) => drink.name === data.name); 
    data.drink = checkDrink[0].id;

    await fetch(`${process.env.STRAPI_URL}/beverages/`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
}

  const handleSubmitExtra = async data => {
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
  }

  if (currentStep === "first") {
    return (
      <Navigation>
        <div className={styles.content}>
          <p className={styles.description}>Choose a glass</p>
        </div>

        <Glasses glasses={glasses} onSubmit={handleSubmitGlasses}/>
      </Navigation>
    )
  }

  if (currentStep === "second" && buttonDrinks === "back") {
    return (
    <Navigation>
      <div className={styles.content}>
        <p className={styles.description}>Add some beverages</p>
        
        <button onClick={(e) => setCurrentStep(e.target.name)} name="third" className={styles.nextButton}>Add Extra's</button>
      </div>

      <Display handleClick={(button) => setButtonDrinks(button)}/>
    </Navigation>
    )
  }

  if (currentStep === "second" && buttonDrinks === "liquor") {
    return (
      <Navigation>
        <div className={styles.content}>
          <p className={styles.description}>Add some liquor</p>
        </div>
  
        <Drinks drinks={drinks.filter((drink) => drink.alcohol === true)} 
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
  
        <Drinks drinks={drinks.filter((drink) => drink.alcohol === false)} 
                onSubmit={handleSubmitDrinks} 
                handleClick={(button) => setButtonDrinks(button)}/>
      </Navigation>
    )
  }

  if (currentStep === "third") {
    return (
      <Navigation>
        <div className={styles.content}>
          <p className={styles.description}>Give your cocktail some finishing touches</p>
        </div>
      
        <Extras extras={extras} onSubmit={handleSubmitExtra}/>
      </Navigation>
    )
  }

  return (
    <Welcome>
      <div className={styles.content}>
        <p className={styles.description}>
          Welcome to our online Cocktail Bar where you can mix and match your favourite drinks and toost to a better future!
        </p>
          
        <button onClick={(e) => setCurrentStep(e.target.name)} name="first" className={styles.nextButton}>Let's start shaking</button>
      </div>
    </Welcome>      
  )
}

export async function getServerSideProps() {
  const [glassesRes, drinksRes, extrasRes, cocktailsRes] = await Promise.all([
    fetch(`${process.env.STRAPI_URL}/glasses`),
    fetch(`${process.env.STRAPI_URL}/drinks`),
    fetch(`${process.env.STRAPI_URL}/extras`),
    fetch(`${process.env.STRAPI_URL}/cocktails`),
  ]);
  const [glasses, drinks, extras, cocktails] = await Promise.all([glassesRes.json(), drinksRes.json(), extrasRes.json(), cocktailsRes.json()]);
  return { props: {glasses, drinks, extras, cocktails} };
}
