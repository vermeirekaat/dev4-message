import Glasses from "../../components/Glasses";
import styles from "../../styles/Counter.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Counter({ data }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.hidden}>Counter</h1>

            <div className={styles.context}>
            <Image src="/assets/letters-glow.png"
                alt="Cocktail O' Clock"
                width={654}
                height={168}
                />
                <p className={styles.question}>Choose a glass</p>
                <Link href="/drinks">
                    <a className={styles.next}>Next</a>
                </Link>
            </div>

            <Glasses glasses={data}/>

        </div>
    )
}

export async function getStaticProps () {
    const response = await fetch(`${process.env.STRAPI_URL}/glasses`);
    const data = await response.json();
  
    return {
      props: {
        data,
      },
    };
  };