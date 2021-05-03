const nodemailer = require('nodemailer');

const { EMAIL, PASSWORD } = process.env;

module.exports = {
    sendEmail: async ( req, res ) => {
        const { name, email, title, message } = req.body;
        // we can adjust later what info will come from req.body and what we want to assign here in the controller

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
                html: `<p>Whatever we want ${message}</p>`,
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