import Layout from "../../components/Layout";
import { createClient as deliveryClient } from "contentful";

export default function Detail ({ cocktail }) {

    console.log(cocktail);

    return (
        <Layout>
            <p>Detail Page</p>
        </Layout>
    )
}

const client = deliveryClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN,
});

export async function getStaticProps ({ params }) {

    const { items } = await client.getEntries({ content_type: "cocktails", "sys.id": params.id });

    return {
        props: {
            cocktail: items
        },
        revalidate: 1,
    }
}; 

export async function getStaticPaths () {

    const response = await client.getEntries({ content_type: "cocktails" });

    const paths = response.items.map((item) => {
        return {
            params: {id: item.sys.id}
        }
    })

    return {
        paths,
        fallback: true,
    }
}