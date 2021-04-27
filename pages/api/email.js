export default async (req, res) => {

    console.log(req);

    if (req.method === "POST") {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_TOKEN);
    
        const message = {
            to: req.body.email, 
            from: {
                email: "kaat.vermeire@telenet.be", 
                name: "Cocktail O'Clock"
            },
            templateId: "d-1cfb003303f447dcbea919d38fa29c62",
            dynamic_template_data: {
                sender: req.body.sender,
                receiver: req.body.receiver,
                url: req.body.url,
            }
        }

        sgMail.send(message).then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        }).catch((error) => {
            console.log(error);
        });

    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  };