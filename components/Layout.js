import styles from "./Layout.module.css";
import Head from "next/head";
import Image from "next/image";

export default function Layout({ children }) {

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

      <main className={styles.main}>{children}</main>
    </div>
  );
};