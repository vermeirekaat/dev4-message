import Layout from "../../components/Layout";
import styles from "./Detail.module.css";
import Animation from "../../components/Animation";
import Final from "../../components/Final";
import { useEffect, useState } from "react";
import { createClient as deliveryClient } from "contentful";

export default function Detail ({ cocktail }) {

    if (!cocktail) {
        return (
            <div className={styles.container}>
                <div className={styles.information}>
                    <h2 className={styles.title}>LOADING...</h2>
                        <p className={styles.description}>Preparing your cocktail.</p>
                </div>
            </div>
        )
    }

    const [animation, setAnimation] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimation(false);
        }, 20000)
    })

    if (cocktail && animation) {
        return (
            <Layout>
                <Animation cocktail={cocktail}/>
            </Layout>
        )
    }

    if (cocktail && !animation) {
        return(
            <Layout>
                <Final cocktail={cocktail}/>
            </Layout>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.information}>
                <h2 className={styles.title}>OOPS...</h2>
                    <p className={styles.description}>Your cocktail doesn't exist.</p>
            </div>
        </div>
    )
}

const client = deliveryClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN,
});

export async function getStaticPaths() {

    const response = await client.getEntries({ content_type: "cocktails" });

    const paths = response.items.map((item) => {
        return {
            params: {id: item.sys.id}
        }
    })

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps({ params }) {

    const { items } = await client.getEntries({
        content_type: "cocktails",
        "sys.id": params.id
    });

    if (!items.length) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    return {
        props: {
            cocktail: items[0],
        },
        revalidate: 7,
    }
}; 