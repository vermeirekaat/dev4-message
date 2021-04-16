import Navigation from "../../components/Navigation";
import Glasses from "../../components/Glasses";
import styles from "../../styles/Counter.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Counter({ glasses, cocktails }) {

  // console.log(glasses);

  const handleSubmit = async (item) => {
    console.log(item);
    const response = fetch(`${process.env.STRAPI_URL}/cocktails/`,
    {
      method: "POST",
      body: JSON.stringify(item), 
      headers: {
        "Content-Type": "application.json", 
      },
    });
    console.log(response);
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

            <Glasses glasses={glasses} onSubmit={handleSubmit}/>
         </div>
    )
}

/* export async function getStaticProps () {
    const response = await fetch(`${process.env.STRAPI_URL}/glasses`);
    const data = await response.json();
  
    return {
      props: {
        data,
      },
    };
  }; */

  export async function getServerSideProps() {
    const [glassesRes, cocktailsRes] = await Promise.all([
      fetch(`${process.env.STRAPI_URL}/glasses`),
      fetch(`${process.env.STRAPI_URL}/cocktails`),
    ]);
    const [glasses, cocktails] = await Promise.all([glassesRes.json(), cocktailsRes.json()]);
    return { props: {glasses, cocktails} };
  }