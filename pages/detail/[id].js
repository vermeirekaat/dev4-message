import Layout from "../../components/Layout";
import styles from "./Detail.module.css";
import { useRouter } from "next/router";
import { createClient as deliveryClient } from "contentful";

export default function Detail ({ cocktail }) {

    const router = useRouter();
    if (router.isFallback) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <Layout>

        <div className={styles.overview}>
            <div className={styles.content}>
                <h2 className={styles.subtitle}>{cocktail.fields.glass}</h2>
                    <p className={styles.item}>{cocktail.fields.beverages}</p>
                    <p className={styles.item}>{cocktail.fields.ingredients}</p>
            </div>

            <div className={styles.information}>
                <p className={styles.item}>To: {cocktail.fields.receiver}</p>
                <p className={styles.message}> Message: {cocktail.fields.message}</p>
                <p className={styles.item}>From: {cocktail.fields.sender}</p>
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

    const result = await client.getEntry(params.id );

    return {
        props: {
            cocktail: result
        },
        revalidate: 1,
    }
}; 

export async function getStaticPaths () {

    const response = await client.getEntries({ content_type: "cocktails" });
    console.log(response);

    const paths = response.items.map((item) => {
        return {
            params: {id: item.sys.id }
        }
    })

    return {
        paths,
        fallback: true,
    }
}