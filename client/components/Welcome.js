import styles from "./Welcome.module.css";
import Head from "next/head";
import Image from "next/image";

export default function Welcome({ children }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Cocktail O' Clock</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div className={styles.title}>
        <h1 className={styles.hidden}>Cocktail O'Clock</h1>
         <Image className={styles.headerImage}
                src="/assets/letters-glow.png"
                alt="Cocktail O' Clock"
                width={654}
                height={168}
                />
        </div>

      <main className={styles.main}>{children}</main>
    </div>
  );
};