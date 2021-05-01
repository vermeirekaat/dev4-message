import Layout from "../../components/Layout";
import Email from "../../components/Email";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Success() {

    const router = useRouter();
    const [cocktail, setCocktail] = useState({});

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
    }

    return (
        <Layout>
            <Email onSubmit={handleSubmitEmail}/>
        </Layout>
    )
}