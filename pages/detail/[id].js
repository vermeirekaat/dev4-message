import Layout from "../../components/Layout";
import styles from "./Detail.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient as deliveryClient } from "contentful";

export default function Detail ({ cocktail, data }) {

    console.log(data);

    const drinksAr = result.items.filter((item) => item.fields.name === "Drinks"); 
    const ingredientsAr = result.items.filter((item) => item.fields.name === "Ingredients");
    
    const drinks = drinksAr[0].fields.objects;
    const ingredients = ingredientsAr[0].fields.objects;

    const [animateGlass, setAnimateGlass] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimateGlass(false);
        }, 4500)
    })

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

    return (
        <Layout>

        <motion.div className={styles.overview}
                    initial={{ y: "10vh", opacity: 0}}
                    animate={{ y: 0, opacity: 1}}
                    transition={{ ease: "easeIn", duration: 2 }}
                    >
            <div className={styles.input}>
                {/* 
                    <h2 className={styles.subtitle}>{cocktail.fields.glassName}</h2>
                    <p className={styles.item}>{cocktail.fields.beverages}</p>
                    <p className={styles.item}>{cocktail.fields.ingredients}</p>
                */ }
                <AnimatePresence>
                    {animateGlass && 
                        <motion.div className={styles.image}
                        initial={{ x: "15vw", scale: 1, opacity: 0}}animate={{ x: "15vw", scale: 1, opacity: 1}}
                        transition={{ ease:"easeIn", duration: 4, delay: .5}}>
                            <Image 
                                src={"https:" + cocktail.fields.glass.fields.image.fields.file.url} 
                                width={cocktail.fields.glass.fields.image.fields.file.details.image.width} 
                                height={cocktail.fields.glass.fields.image.fields.file.details.image.height}
                            />
                        </motion.div>
                    }
                    {!animateGlass &&
                        <motion.div className={styles.image}
                        initial={{ y: 0, x: "15vw", scale: 1, opacity: 1 }}
                        animate={{ y: 0, x: 0, scale: 1, opacity: 1}}
                        transition={{ delay: .7, ease:"easeOut", duration: 3}}>
                            <Image 
                                src={"https:" + cocktail.fields.glass.fields.image.fields.file.url} 
                                width={cocktail.fields.glass.fields.image.fields.file.details.image.width} 
                                height={cocktail.fields.glass.fields.image.fields.file.details.image.height}
                            />
                        </motion.div>
                    }
                </AnimatePresence>
            </div>

            <motion.div className={styles.content}
                        initial={{ x: "15vh", opacity: 0}}
                        animate={{ x: 0, opacity: 1}}
                        transition={{ delay: 5, duration: 4 }}>
                <p className={styles.item}>To: {cocktail.fields.receiver}</p>
                <div className={styles.messageContainer}>
                <p className={styles.message}>{cocktail.fields.message}</p>
                </div>
                
                <p className={styles.item}>From: {cocktail.fields.sender}</p>
            </motion.div>
        </motion.div>
        </Layout>
    )
}

const client = deliveryClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN,
});

export async function getStaticProps ({ params }) {

    const result = await client.getEntry(params.id);
    const data = await client.getEntries({ content_type: "data"});

    return {
        props: {
            cocktail: result,
            data
        },
        revalidate: 1,
    }
}; 

export async function getStaticPaths() {

    const response = await client.getEntries({ content_type: "cocktails" });

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