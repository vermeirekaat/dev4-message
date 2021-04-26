import Layout from "../../components/Layout";
import styles from "./Detail.module.css";
import { createClient as deliveryClient } from "contentful";

export default function Detail ({ cocktail }) {
    const cocktailItems = cocktail[0].fields;

    return (
        <Layout>

        <div className={styles.overview}>
            <div className={styles.content}>
                <h2 className={styles.subtitle}>{cocktailItems.glass}</h2>
                    <p className={styles.item}>{cocktailItems.beverages}</p>
                    <p className={styles.item}>{cocktailItems.ingredients}</p>
            </div>

            <div className={styles.information}>
                <p className={styles.item}>To: {cocktailItems.receiver}</p>
                <p className={styles.message}> Message: {cocktailItems.message}</p>
                <p className={styles.item}>From: {cocktailItems.sender}</p>
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

    const { items } = await client.getEntries({ content_type: "cocktails", "sys.id": params.id });

    return {
        props: {
            cocktail: items
        },
        revalidate: 1,
    }
}; 

export async function getStaticPaths () {

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