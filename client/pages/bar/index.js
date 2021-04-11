import Head from "next/head";
import Setup from "../../components/Setup";

export default function Bar() {
    return (
        <>
        <Head>
            <title>Cocktail O' Clock</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Setup/>       
        </>
    )
}