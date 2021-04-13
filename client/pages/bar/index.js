import Head from "next/head";
import Setup from "../../components/Setup";

export default function Bar({ data }) {
    return (
        <>
        <Head>
            <title>Cocktail O' Clock</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Setup drinks={data}/>       
        </>
    )
}

export async function getStaticProps () {
    const response = await fetch(`${process.env.STRAPI_URL}/drinks`);
    const data = await response.json();
  
    return {
      props: {
        data,
      },
    };
  };