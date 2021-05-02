import Layout from "../../components/Layout";
import styles from "./Detail.module.css";
import Animation from "../../components/Animation";
import Final from "../../components/Final";
import Skeleton from "../../components/Skeleton";
import { useEffect, useState } from "react";
import { createClient as deliveryClient } from "contentful";

export default function Detail ({ cocktail }) {

    if (!cocktail) return <Skeleton/>

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

export async function getStaticProps ({ params }) {

    const result = await client.getEntry(params.id);

    return {
        props: {
            cocktail: result,
        },
        revalidate: 1,
        notFound: true,
    }
}; 