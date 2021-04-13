import Head from "next/head";
import Setup from "../../components/Setup";

export default function Bar({ liquors }) {
    return (
        <>
        <Head>
            <title>Cocktail O' Clock</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Setup drinks={liquors}/>       
        </>
    )
}

export async function getStaticProps () {
    const response = await fetch(
      `${process.env.STRAPI_URL}/liquors`
    );
    const liquors = await response.json();
  
    return {
      props: {
        liquors,
      },
    };
  };