import Layout from "../../components/Layout";
import styles from "./Detail.module.css";
import Image from "next/image";
import { createClient as deliveryClient } from "contentful";

export default function Detail ({ cocktail }) {

    if (!cocktail) {
        return(
            <Layout>
                <motion.div className={styles.content}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition= {{duration: 2, delay: 1.5, delayChildren: .5}}>
                    <h2 className={styles.title}>LOADING...</h2>
                        <p className={styles.description}>Your cocktail is being made.</p>
            </motion.div>
            </Layout>
        )
    }

    return (
        <Layout>

        <div className={styles.overview}>
            <div className={styles.content}>
                <h2 className={styles.subtitle}>{cocktail.fields.glassName}</h2>
                    <p className={styles.item}>{cocktail.fields.beverages}</p>
                    <p className={styles.item}>{cocktail.fields.ingredients}</p>
                <div className={styles.image}>
                    <Image 
                        src={"https:" + cocktail.fields.glass.fields.image.fields.file.url} 
                        width={cocktail.fields.glass.fields.image.fields.file.details.image.width / 1.5} 
                        height={cocktail.fields.glass.fields.image.fields.file.details.image.height / 1.5}
                    />
                </div>
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

    const result = await client.getEntry(params.id);

    return {
        props: {
            cocktail: result
        },
        revalidate: 1,
    }
}; 

export async function getStaticPaths() {

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