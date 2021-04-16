import Navigation from "../../components/Navigation";
import Glasses from "../../components/Glasses";
import styles from "../../styles/Counter.module.css";
import Image from "next/image";

export default function Counter({ glasses }) {

  // console.log(glasses);
  // console.log(cocktails);

  const handleSubmit = async (item) => {

    const cocktail = {
      ingredient: {
        name: "test", 
        quantity: "2.2",
      },
      recipient: "test",
      content: "test text",
      glass: item,
    }
    await fetch(`${process.env.STRAPI_URL}/cocktails`,
    // const response = await fetch(`http://localhost:1337/cocktails`,
    {
      method: "POST",
      body: JSON.stringify(cocktail), 
      headers: {
        "Content-type": "application/json; charset=UTF-8", 
      },
    });
    refetch();
    // console.log(response.body);
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

/* export async function getServerSideProps() {
    const [glassesRes, cocktailsRes] = await Promise.all([
      fetch(`${process.env.STRAPI_URL}/glasses`),
      fetch(`${process.env.STRAPI_URL}/cocktails`),
    ]);
    const [glasses, cocktails] = await Promise.all([glassesRes.json(), cocktailsRes.json()]);
    return { props: {glasses, cocktails} };
  } */ 