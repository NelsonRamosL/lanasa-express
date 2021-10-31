const nodemailer = require('nodemailer');


 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nodemailerclase2021@gmail.com',
            pass: 'pelado2021',
        },
    });
 


const send = async (email,nombre) => {
      
    let mailOptions = {
        from: 'nodemailerclase2021@gmail.com',
        to: [email],
        subject: "Saludos desde la nasa!!",
        html: `<h3> ¡hola, ${nombre}! <br> La Nasa te da las gracias por subir tu foto a nuestro istema`
    }
 console.log(mailOptions);
    await transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err)
            return false;
        }
        if (data) return true;
        
})



}
module.exports = send;

