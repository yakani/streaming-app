const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.gmail,
      pass: process.env.pass_gmail,
    },
  });
  const SendCOnfirmation=async(user)=>{
    const body=`
    <h1>Hi Admin do you authorized  Mr ${user.name}  to  be an admin </h1>
    <h3>if yes send him the ID code bellow </h3>
    <h3> ${user.code}</h3>`
    const mailoption={
        from: {
            name:"Yak",
            address:process.env.gmail
        }, // sender address
        to: process.env.Admin, // list of receivers
        subject: "Authorization Acess To Yak ", // Subject line
        text: "", // plain text body
        html: body, // html body
      };
     transporter.sendMail(mailoption,(error,info)=>{
        if(error){
          return  console.log(error);
        }
        console.log("Message sent: %s", info.messageId); 
     });
  }
  const SendWelcome=async(user)=>{
    const body=`
    <h1>Hi   Mr/Mrs ${user.name}  welcome to Yak screaming app </h1>
    <h3>Enjoy your popular film and series </h3>
    <h3> for any problem contact us here <a href="http://localhost:5173/contactus"> Contact Us</a></h3>`
    const mailoption={
        from: {
            name:"Yak",
            address:process.env.gmail
        }, // sender address
        to: user.email, // list of receivers
        subject: "Welcome To Yak ", // Subject line
        text: "", // plain text body
        html: body, // html body
      };
     transporter.sendMail(mailoption,(error,info)=>{
        if(error){
          return  console.log(error);
        }
        console.log("Message sent: %s", info.messageId); 
     });
  }
  module.exports={SendCOnfirmation ,SendWelcome}