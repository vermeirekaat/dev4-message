import Layout from "../../components/Layout";
import styles from "./Detail.module.css";
import Animation from "../../components/Animation";
import Final from "../../components/Final";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { createClient as deliveryClient } from "contentful";

export default function Detail ({ cocktail }) {

    const router = useRouter();

    if (router.isFallback) {
        return (
            <div className={styles.container}>
                <div className={styles.information}>
                    <h2 className={styles.title}>OOPS...</h2>
                        <p className={styles.description}>Your cocktail doesn't exist.</p>
                </div>
            </div>
        );
    }

    const [animation, setAnimation] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimation(false);
        }, 20000)
    })

    if (!cocktail) {
        return(
            <div className={styles.container}>
                <motion.div className={styles.information}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition= {{duration: 2, delay: 1.5, delayChildren: .5}}>
                    <h2 className={styles.title}>OOPS...</h2>
                        <p className={styles.description}>Your cocktail doesn't exist.</p>
                </motion.div>
            </div>
        )
    }

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
        <Layout>
            <div className={styles.container}>
                <div className={styles.information}>
                    <h2 className={styles.title}>LOADING...</h2>
                        <p className={styles.description}>Your cocktail is being made.</p>
                </div>
            </div>
        </Layout>
    )
}

const client = deliveryClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN,
});

export async function getStaticProps ({ params }) {

    const result = await client.getEntry(params.id);

    return {
        props: {
            cocktail: result,
        },
        revalidate: 1,
    }
}; 

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