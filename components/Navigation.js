import styles from "./Navigation.module.css";
import Head from "next/head";
import Image from "next/image";

export default function Navigation({ overview, children }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Cocktail O' Clock</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div className={styles.title}>
        <h1 className={styles.hidden}>Cocktail O'Clock</h1>
          <div className={styles.headerImage}>
            <Image
                    src="/assets/letters-glow.webp"
                    alt="Cocktail O' Clock"
                    width={654}
                    height={168}
                    />
          </div>
      </div>

      <div className={styles.overview}>
        <div className={styles.content}>
        <h2 className={styles.subtitle}>Your Cocktail</h2>
            <p className={styles.item}>{overview.glass}</p>
          <h3 className={styles.part}>Shots</h3>
              {overview.beverages.map((drink) => {
                <p className={styles.item}>{drink}</p>
              })}
            <h3 className={styles.part}>Extra</h3>
              {overview.ingredients.map((extra) => {
                <p className={styles.item}>{extra}</p>
              })}
        </div>
      </div>

      <main className={styles.main}>{children}</main>
    </div>
  );
};