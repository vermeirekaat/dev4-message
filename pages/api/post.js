import { createClient as managementClient } from "contentful-management";

export default async (req, res) => {

    if (req.method === "POST") {
        
        try {

        const client = managementClient({
            accessToken: process.env.CONTENTFUL_POST,
        });

        const response = client.getSpace(process.env.CONTENTFUL_SPACE).then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVI)).then((environment) => 
        environment.createEntryWithId("cocktails", req.body.nano,
        {
            fields: {
                glassName: {
                    "en-US": req.body.glassName
                },
                glass: {
                    "en-US": {
                        sys: {
                            type: "Link",
                            linkType: "Entry",
                            id: req.body.glass,
                        }
                    }
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
                sender: {
                    "en-US": req.body.sender
                },
                receiver: {
                    "en-US": req.body.receiver
                },
            },
        })).then((entry) => entry.publish());

        if (response.status === 201) {
            res.status(200).json({ succeeded: true});
        } else {
            const result = await response;
            res.status(200).json({ succeeded: true, reason: result });
        }
        } catch (e) {
            res.status(500).end(`Something went wrong: ${e}`);
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}