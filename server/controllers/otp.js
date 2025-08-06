const jwt = require("jsonwebtoken")
const OTP = require("../models/Otp")
const Customer = require("../models/Customers")
const { transporter, mailOptions } = require("../utils/mail")
const { generateOTP } = require("../utils/utils")

exports.sendOTP = async (req, res) =>{
    const { email } = req.body

    // send email
    const otp = generateOTP()
    
    const emailBody = `${otp} use to this otp to login \n\n Please Don't share this with anyone.`
    try {
        await transporter.sendMail({...mailOptions, to: email, subject:"Login OTP", text:emailBody})
    } catch (error) {
        return res.json({message: "Error sending email", error})
    }

    const token = jwt.sign({key: email}, process.env.JWT_SECRET)
    await OTP.create({key: email, otp})
    return res.json({token})
}

exports.verifyOTP = async (req, res) =>{
    const {token, otp} = req.body
    let payload
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
       return res.json({message: "Invalid token", error})
    }

    const otpData = await OTP.findOne({key: payload.key}).sort({createdAt: -1}).limit(1)

    if(!otpData){
        return res.json({message: "OTP Expired"})
    }

    if(otpData.otp !== otp){
        return res.json({message:"Invalid OTP"})
    }

    return res.send("LoggedIn")
}