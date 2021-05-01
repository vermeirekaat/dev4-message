import Layout from "../../components/Layout";
import styles from "./Detail.module.css";
import Animation from "../../components/Animation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient as deliveryClient } from "contentful";

export default function Detail ({ cocktail }) {

    const [animateGlass, setAnimateGlass] = useState(true);

    const [animation, setAnimation] = useState(true);

    /* useEffect(() => {
        setTimeout(() => {
            setAnimateGlass(false);
        }, 10000)
    }) */

    if (!cocktail) {
        return(
            <div className={styles.container}>
                <motion.div className={styles.information}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition= {{duration: 2, delay: 1.5, delayChildren: .5}}>
                    <h2 className={styles.title}>LOADING...</h2>
                        <p className={styles.description}>Your cocktail is being made.</p>
                </motion.div>
            </div>
        )
    }

    if (animation) {
        return (
            <Layout>
                <Animation cocktail={cocktail}/>
            </Layout>
        )
    }

    return (
        <Layout>

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