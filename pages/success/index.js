import Layout from "../../components/Layout";
import Email from "../../components/Email";
import Skeleton from "../../components/Skeleton";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import { createClient as deliveryClient } from "contentful";

export default function Success() {

    // console.log(result);
    
    // const cocktail = result.items[0];

    const router = useRouter();
    const [cocktail, setCocktail] = useState({});

    useEffect(() => {
        if (router.isReady) {
            setCocktail(router.query);
        }
    });

    console.log(cocktail);

/* const [emailInformation, setEmailInfromation] = useState({
        ,
    }); */

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

        const res = handleSendEmail(sendEmail);
        console.log(res);
    }

    /* useEffect(() => {
        handleSendEmail(emailInformation);
     },[emailInformation]); */

    return (
        <Layout>
            <Email onSubmit={handleSubmitEmail}/>
        </Layout>
    )
}

/* export async function getStaticProps() {

    const client = deliveryClient({
        space: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN,
    });
  
    const result = await client.getEntries({ content_type: "cocktails" }); 
  
    return {
      props: {
        result
      },
      revalidate: 1,
    }
  } */