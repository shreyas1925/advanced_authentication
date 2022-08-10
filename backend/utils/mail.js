const nodemailer = require('nodemailer');

exports.generateOTP = () => {
    let otp = '';
    for (let i = 0; i < 4; i++) {
        otp += Math.floor(Math.random() * 9);
    }
    return otp;
}

exports.transportMail = () =>
    nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD
        }
    })

exports.mailTemplate = (code) => {
    return `
    <body style="background-color:grey">
        <table align="center" border="0" cellpadding="0" cellspacing="0"
            width="550" bgcolor="white" style="border:2px solid black">
            <tbody>
                <tr>
                    <td align="center">
                        <table align="center" border="0" cellpadding="0"
                            cellspacing="0" class="col-550" width="550">
                            <tbody>
                                <tr>
                                    <td align="center" style="background-color: #4cb96b;
                                            height: 50px;">
    
                                        <a href="#" style="text-decoration: none;">
                                            <p style="color:white;
                                                    font-weight:bold;">
                                                MERN Auth Application
                                            </p>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="height: 300px;">
                    <td align="center" style="border: none;
                            border-bottom: 2px solid #4cb96b;
                            padding-right: 20px;padding-left:20px">
    
                        <p style="font-weight: bolder;font-size: 42px;
                                letter-spacing: 0.025em;
                                color:black;">
                            Hello Geeks!
                            <br> 

                            <h1>${code}</h1>
                        </p>
                    </td>
                </tr>
    
            
                <tr style="border: none;
                background-color: #4cb96b;
                height: 40px;
                color:white;
                padding-bottom: 20px;
                text-align: center;">
                    
            <td height="40px" align="center">
                <p style="color:white;
                line-height: 1.5em;">
                GeeksforGeeks
                </p>
            </td>
            </tr>
            </tbody>
        </table>
    </body>
    `
}

exports.plainmailTemplate = (message, heading) => {
    return `
    <body style="background-color:grey">
        <table align="center" border="0" cellpadding="0" cellspacing="0"
            width="550" bgcolor="white" style="border:2px solid black">
            <tbody>
                <tr>
                    <td align="center">
                        <table align="center" border="0" cellpadding="0"
                            cellspacing="0" class="col-550" width="550">
                            <tbody>
                                <tr>
                                    <td align="center" style="background-color: #4cb96b;
                                            height: 50px;">
    
                                        <a href="#" style="text-decoration: none;">
                                            <p style="color:white;
                                                    font-weight:bold;">
                                               ${heading}
                                            </p>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="height: 300px;">
                    <td align="center" style="border: none;
                            border-bottom: 2px solid #4cb96b;
                            padding-right: 20px;padding-left:20px">
    
                        <p style="font-weight: bolder;font-size: 42px;
                                letter-spacing: 0.025em;
                                color:black;">
                            Hello Geeks!
                            <br> 

                            <h1>${message}</h1>
                        </p>
                    </td>
                </tr>
    
            
                <tr style="border: none;
                background-color: #4cb96b;
                height: 40px;
                color:white;
                padding-bottom: 20px;
                text-align: center;">
                    
    <td height="40px" align="center">
        <p style="color:white;
        line-height: 1.5em;">
        GeeksforGeeks
        </p>
        <a href="#"
        style="border:none;
            text-decoration: none;
            padding: 5px;">
        
     
    </td>
    </tr>
            </tbody>
        </table>
    </body>
    `
}

exports.resetPasswordTemplate = (message, url) => {
    return `
    <body style="background-color:grey">
        <table align="center" border="0" cellpadding="0" cellspacing="0"
            width="550" bgcolor="white" style="border:2px solid black">
            <tbody>
                <tr>
                    <td align="center">
                        <table align="center" border="0" cellpadding="0"
                            cellspacing="0" class="col-550" width="550">
                            <tbody>
                                <tr>
                                    <td align="center" style="background-color: #4cb96b;
                                            height: 50px;">
    
                                        <a href="#" style="text-decoration: none;">
                                            <p style="color:white;
                                                    font-weight:bold;">
                                               ${message}
                                            </p>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="height: 300px;">
                    <td align="center" style="border: none;
                            border-bottom: 2px solid #4cb96b;
                            padding-right: 20px;padding-left:20px">
    
                        <p style="font-weight: bolder;font-size: 42px;
                                letter-spacing: 0.025em;
                                color:black;">
                            Hello Geeks!
                            <br> 

                            <h1>${url}</h1>
                        </p>
                    </td>
                </tr>
    
            
                <tr style="border: none;
                background-color: #4cb96b;
                height: 40px;
                color:white;
                padding-bottom: 20px;
                text-align: center;">
                    
    <td height="40px" align="center">
        <p style="color:white;
        line-height: 1.5em;">
        GeeksforGeeks
        </p>
        <a href="#"
        style="border:none;
            text-decoration: none;
            padding: 5px;">
        
     
    </td>
    </tr>
            </tbody>
        </table>
    </body>
    `
}

exports.emailTemplate = (message, heading) => {

    return `
    <body style="background-color:grey">
        <table align="center" border="0" cellpadding="0" cellspacing="0"
            width="550" bgcolor="white" style="border:2px solid black">
            <tbody>
                <tr>
                    <td align="center">
                        <table align="center" border="0" cellpadding="0"
                            cellspacing="0" class="col-550" width="550">
                            <tbody>
                                <tr>
                                    <td align="center" style="background-color: #4cb96b;
                                            height: 50px;">
    
                                        <a href="#" style="text-decoration: none;">
                                            <p style="color:white;
                                                    font-weight:bold;">
                                               ${heading}
                                            </p>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr style="height: 300px;">
                    <td align="center" style="border: none;
                            border-bottom: 2px solid #4cb96b;
                            padding-right: 20px;padding-left:20px">
    
                        <p style="font-weight: bolder;font-size: 42px;
                                letter-spacing: 0.025em;
                                color:black;">
                            Hello Geeks!
                            <br> 

                            <h1>${message}</h1>
                        </p>
                    </td>
                </tr>
    
            
                <tr style="border: none;
                background-color: #4cb96b;
                height: 40px;
                color:white;
                padding-bottom: 20px;
                text-align: center;">
                    
    <td height="40px" align="center">
        <p style="color:white;
        line-height: 1.5em;">
        GeeksforGeeks
        </p>
        <a href="#"
        style="border:none;
            text-decoration: none;
            padding: 5px;">
        
     
    </td>
    </tr>
            </tbody>
        </table>
    </body>
    `

}