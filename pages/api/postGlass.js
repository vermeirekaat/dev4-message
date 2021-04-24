export default async (req, res) => {
    if (req.method === "POST") {
        
        try {
            const response = await fetch(`https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE}/environments/${process.env.CONTENTFUL_ENVI}/entries`, {
            method: "POST", 
            headers: {
                "Authorization": `Bearer ${process.env.CONTENTFUL_POST}`,
                "Content-Type": "application/vnd.contentful.management.v1+json",
                "X-Contentful-Content-Type": "cocktail",
            },
            body: JSON.stringify({ 
                "fields": {
                    "glass": {
                      "en-US": req.body.data.glass
                    },
                    "recipient": {
                      "en-US": "test"
                    },
                    "message": {
                        "en-US": "test-message"
                    },
                },
            })
        });
        if (response.status === 201) {
            res.status(200).json({ succeeded: true});
        } else {
            const result = await response.json();
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