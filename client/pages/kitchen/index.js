import Navigation from "../../components/Navigation";
import Extras from "../../components/Extras";
import styles from "./Kitchen.module.css";
import Image from "next/image";

export default function Kitchen({ extras, cocktails }) {

    const getId= () => {
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

      const handleSubmit = async data => {
        const id = getId();
        data.cocktail = id;

        const extraId = getExtraId(data);
        console.log(extraId);

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
            

            <Extras extras={extras} onSubmit={handleSubmit}/>
         </div>
    )
}

export async function getServerSideProps() {
    const [extraRes, cocktailsRes] = await Promise.all([
      fetch(`${process.env.STRAPI_URL}/extras`),
      fetch(`${process.env.STRAPI_URL}/cocktails`),
    ]);
    const [extras, cocktails] = await Promise.all([extraRes.json(), cocktailsRes.json()]);
    return { props: {extras, cocktails} };
  }