const nodemailer = require('nodemailer');

const { EMAIL, PASSWORD } = process.env;

module.exports = {
    sendEmail: async ( req, res ) => {
        const { name, email, message, messageObj } = req.body;
        // we can adjust later what info will come from req.body and what we want to assign here in the controller
        const newMessage = messageObj.map((e, i) => {
          return (  
            `<h1>${e.city_name}, ${e.state}</h1>
            <ol key=${i}>
                <img style="width: 600px; height: auto;" src=${e.city_img} alt=${e.city_img}/>
                <li>Area: ${e.population > 20000 ? 'Urban' : 'Rural'}</li>
                <li>Waterfront: ${e.waterfront === true ? 'Yes' : 'No'}</li>
                <li>Family Friendly: ${e.family_friendly === true ? 'Yes' : 'No'}</li>
                <li>Adult Friendly: ${e.adult_friendly === true ? 'Yes' : 'No'}</li>
            </ol>`
          )
        })

        const title = `Travel Destinations shared by ${name}`
        try {

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            });

            let info = await transporter.sendMail({
                from: `'${name}' <${email}>`,
                to: email,
                subject: title,
                // Had to add toString otherwise an error occurred on send of email. Need to figure out how to pass images and all that. If possible. 
                text: message.toString(),
                html: `<p>${message}</p>
                <p>${newMessage}</p>`,
                // attachments: [
                //     {
                //         filename: '',
                //         path: '',
                //     }
                // ]
            },
            (err, res) => {
                if (err) {
                    console.log('err', err)
                } else {
                    console.log('res', res)
                    res.status(200).send(info)
                }
            })

        }
        catch(err) {

            console.log(err)
            res.sendStatus(500)
            
        }
        
    }
}