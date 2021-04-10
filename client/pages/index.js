import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cocktail O' Clock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
         <Image className={styles.headerImage}
                src="/assets/letters-glow.png"
                alt="Cocktail O' Clock"
                width={654}
                height={168}
                />
        </h1>

        <p className={styles.description}>
          Welcome to our online Cocktail Bar where you can mix and match your favourite drinks and toost to a better future!
        </p>

          <Link href="/">
          <a className={styles.button}>Let's start shaking</a>
          </Link>
      </main>
    </div>
  )
}
