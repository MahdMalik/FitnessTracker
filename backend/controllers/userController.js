const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const { PinataSDK } = require('pinata');


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    const pinata = new PinataSDK({
      pinataJwt: process.env.VITE_PINATA_JWT,
      pinataGateway: process.env.VITE_GATEWAY_URL
    })
    const group = await pinata.groups.create({
      name: email,
    });
    // const response = await fetch("https://" + pinata.pinataGateway + "/ipfs/" + process.env.QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j",
    //   {headers:
    //   {
    //     'x-pinata-gateway-token': 'Qsml9dIG8OVv8wDHmO3oY022BaZlnCzUrdOBuWwaAxMV-dAzfQBUp-L-29v2osVQ'
    //   }}
    // )
    


    // create a token
    const token = createToken(user._id)
    res.status(200).json({email, token})
  } 
  catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }