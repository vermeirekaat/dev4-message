import Layout from "../../components/Layout";
import Email from "../../components/Email";
import styles from "./Success.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Success() {

    const router = useRouter();
    const [cocktail, setCocktail] = useState({});
    const [sendEmail, setSendEmail] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            setCocktail(router.query);
        }
    });

    const handleSendEmail = async (email) => {
        const response = await fetch("/api/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(email),
        });
        await response.json();
    }

    const handleSubmitEmail = data => {
        const sendEmail = {
            receiver: cocktail.receiver, 
            sender: cocktail.sender, 
            url: `${process.env.NEXT_PUBLIC_URL_DOMAIN}/detail/` + cocktail.nano, 
            email: data.email,
        }
        
        handleSendEmail(sendEmail);
        setSendEmail(true);
    }

    if(sendEmail) {
        return (
            <Layout>
                 <div className={styles.container}>
                    <motion.h2 className={styles.title}
                                initial={{ y: "-5vh", opacity: 0}}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1, ease: "easeIn"}}
                    >Cheers!</motion.h2>

                    <motion.p className={styles.description}
                                initial={{ y: "-5vh", opacity: 0}}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: .5, duration: 1.5, ease: "easeIn"}}>Your virtual cocktail is ready to be served.</motion.p>
                </div>
            </Layout>
        )
    }


    return (
        <Layout>
            <Email onSubmit={handleSubmitEmail}/>
        </Layout>
    )
}