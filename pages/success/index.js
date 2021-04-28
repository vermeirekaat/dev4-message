import Layout from "../../components/Layout";
import Email from "../../components/Email";
import { useState, useEffect } from "react";
import { createClient as deliveryClient } from "contentful";
// import styles from "./Success.module.css";

export default function Success({ result }) {
    
    const cocktail = result.items[0];

    const [emailInformation, setEmailInfromation] = useState({
        receiver: cocktail.fields.receiver, 
        sender: cocktail.fields.sender, 
        url: `${process.env.URL_DOMAIN}/detail/` + cocktail.sys.id, 
        email: "",
    });

    const handleSendEmail = async () => {
        if (emailInformation.email === "") {
            return false;
        }

        const response = await fetch("/api/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailInformation),
        });
        await response.json();
    }

    const handleSubmitEmail = data => {

       const copy = {...emailInformation};
       copy.email = data.email, 
       setEmailInfromation(copy);
    }

    useEffect(() => {
        handleSendEmail(emailInformation);
     },[emailInformation]);

    return (
        <Layout>
            <Email onSubmit={handleSubmitEmail}/>
        </Layout>
    )
}

export async function getStaticProps() {

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
  }