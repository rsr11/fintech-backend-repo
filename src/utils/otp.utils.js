import nodemailer from "nodemailer";



// const sendOtp = (email,)=>{



// }



export const OtpGenrator = ()=>{

      const one = Math.floor(Math.random()*9);
      const two = Math.floor(Math.random()*9);
      const three = Math.floor(Math.random()*9);
      const four = Math.floor(Math.random()*9);
      const five = Math.floor(Math.random()*9);
      const six = Math.floor(Math.random()*9);

     return String(one)+String(two)+String(three)+String(four)+String(five)+String(six);
}

// console.log(creatingOtp());
 




// export const otp = OtpGenrator();

export const OtpSender = async (toEmail, otp) => {

    // console.log(process.env.EMAIL_ID + "  " + process.env.EMAIL_PASSKEY);
    
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSKEY 
      }
    });


    try {

        const info = await transporter.sendMail({
    from: '"FinPocket" <rsr45411@gmail.com>',
    to: toEmail,
    subject: 'Your OTP Code',
    html: `
    <div>
    <h1>FinPocket 🪙</h1>
    <p>Your OTP is : <strong>${otp}</strong></p>
    <div>
    `
  });

  // console.log(info);
  
  console.log('Message sent:', info.messageId);
  return true;
      
    } catch (error) {
        console.log("error in otp sending "+error);
        return false;
     
    }
  
};


