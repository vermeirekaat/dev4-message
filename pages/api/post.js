import { createClient as managementClient } from "contentful-management";

export default async (req, res) => {

    const mapArray = array => {
        array.map((item) => {
            console.log(item);
            return item;
        })
    }

    if (req.method === "POST") {
        
        try {

        const client = managementClient({
            accessToken: process.env.CONTENTFUL_POST,
        });

        const response = client.getSpace(process.env.CONTENTFUL_SPACE).then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVI)).then((environment) => 
        environment.createEntry("cocktails", {
            fields: {
                glass: {
                    "en-US": req.body.glass
                }, 
                beverages: {
                    "en-US": req.body.beverages.toString()
                },
                ingredients: {
                    "en-US": req.body.ingredients.toString()
                },
                message: {
                    "en-US": req.body.message
                },
            },
        })).then((entry) => entry.publish());

        if (response.status === 201) {
            res.status(200).json({ succeeded: true});
        } else {
            const result = await response;
            res.status(200).json({ succeeded: false, reason: result });
        }
        } catch (e) {
            res.status(500).end(`Something went wrong: ${e}`);
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}