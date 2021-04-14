import styles from "../styles/Navigation.module.css";
import Head from "next/head";
import Link from "next/link";

export default function Navigation({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cocktail O' Clock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Link href="/counter">
            <a className={styles.link}>Glasses</a>
        </Link>
        <Link href="/bar">
            <a className={styles.link}>Drinks</a>
        </Link>
        <Link href="/">
          <a className={styles.link}>Extra's</a>
        </Link>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};