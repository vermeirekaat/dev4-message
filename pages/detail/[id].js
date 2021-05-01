import Layout from "../../components/Layout";
import styles from "./Detail.module.css";
import Animation from "../../components/Animation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient as deliveryClient } from "contentful";

export default function Detail ({ cocktail, data }) {

    const drinksAr = data.items.filter((item) => item.fields.name === "Drinks"); 
    const ingredientsAr = data.items.filter((item) => item.fields.name === "Ingredients");
    
    const drinks = drinksAr[0].fields.objects;
    const ingredients = ingredientsAr[0].fields.objects;

    const checkedDrinks = cocktail.fields.beverages.split(",");
    const checkedExtra = cocktail.fields.ingredients.split(",");

    const mapArray = (array, check) => {
        const filter = [];
        array.map((part) => {
            const filtered = check.filter((item) => item.sys.id === part);
            filter.push(filtered[0]);
            }); 
        return filter;
    }

    const drinkChoice = mapArray(checkedDrinks, drinks);
    const extraChoice = mapArray(checkedExtra, ingredients)

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
                <Animation cocktail={cocktail} drinks={drinkChoice} ingredients={extraChoice}/>
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
    const data = await client.getEntries(params.data);

    return {
        props: {
            cocktail: result,
            data: data,
        },
        revalidate: 1,
    }
}; 

export async function getStaticPaths() {

    const response = await client.getEntries({ content_type: "cocktails" });
    const data = await client.getEntries({ content_type: "data"});

    const paths = response.items.map((item) => {
        return {
            params: {id: item.sys.id, data: data}
        }
    })

    return {
        paths,
        fallback: true,
    }
}